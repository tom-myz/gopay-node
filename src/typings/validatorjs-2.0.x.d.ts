declare module "validatorjs" {

    type AttributeFormatter = (attribute: any) => any
    type Rule = Function
    type HashMap = { [field: string]: string }
    type ParsedRule = {
        attribute: Array<{ name: string, value: any }>
    }

    class Errors {
        public errors : HashMap

        add (attribute: string, message: string): void
        get (attribut: string): Array<string>
        first (attribute: string): string | boolean
        all (): HashMap
        has (attribute: string): boolean
    }

    class Validator {

        public lang: string
        public input: any
        public messages: HashMap
        public errors: Errors
        public errorCount: number
        public hasAsync: boolean
        public rules: HashMap
        public numericRules: Array<string>
        public attributeFormatter: AttributeFormatter

        constructor (data: any, rules: HashMap , customMessages?: HashMap)
        check (): boolean
        checkAsync (passes?: Function, fails?: Function): void
        setAttributeNames (attributes: HashMap): void
        setAttributeFormatter (func: AttributeFormatter): void
        getRule (name: string): Rule
        stopOnError (passes?: Function): boolean | void
        passes (passes?: Function): boolean | void
        fails (fails?: Function): boolean | void
        static setMessages (lang: string, messages: HashMap): any
        static getMessages (lang: string): HashMap
        static useLang (lang: string): void
        static getDefaultLang (): string
        static setAttributeFormatter (func: AttributeFormatter): void
        static stopOnError (attributes: boolean | Array<string>): void
        static register (name: string, fn: Function, message: string): void
        static registerAsync (name: string, fn: Function, message: string): void

    }

    export = Validator

}