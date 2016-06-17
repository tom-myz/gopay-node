declare module "validatorjs" {

    type AttributeFormatter = (attribute: any) => any
    type ParsedRule = {
        attribute: Array<{ name: string, value: any }>
    }

    type PassesFn = (pass?: boolean, reason?: string) => void
    type ValidatorFn = (value: any, requirement?: any, attribute?: string) => boolean
    type ValidatorAsyncFn = (value: any, requirement?: any, attribute?: string, passes?: PassesFn) => boolean

    class Rule {
        validate (inputValue: any, ruleValue: any, attribute: string, callback: Function): boolean | void
        getParameters (): Array<any>
        getSize (): number
        response (passes?: boolean, message?: string): void
        setValidator (validator: Validator): void
    }

    class Errors {
        public errors : any

        add (attribute: string, message: string): void
        get (attribut: string): Array<string>
        first (attribute: string): string | boolean
        all (): any
        has (attribute: string): boolean
    }

    class Validator {

        public lang: string
        public input: any
        public messages: any
        public errors: Errors
        public errorCount: number
        public hasAsync: boolean
        public rules: any
        public numericRules: Array<string>
        public attributeFormatter: AttributeFormatter

        constructor (data: any, rules: any , customMessages?: any)
        check (): boolean
        checkAsync (passes?: Function, fails?: Function): void
        setAttributeNames (attributes: any): void
        setAttributeFormatter (func: AttributeFormatter): void
        getRule (name: string): Rule
        stopOnError (passes?: Function): boolean | void
        passes (passes?: Function): boolean | void
        fails (fails?: Function): boolean | void
        static setMessages (lang: string, messages: any): any
        static getMessages (lang: string): any
        static useLang (lang: string): void
        static getDefaultLang (): string
        static setAttributeFormatter (func: AttributeFormatter): void
        static stopOnError (attributes: boolean | Array<string>): void
        static register (name: string, fn: ValidatorFn, message?: string): void
        static registerAsync (name: string, fn: ValidatorAsyncFn, message?: string): void

    }

    export = Validator

}
