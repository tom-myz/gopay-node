import Polyglot = require("node-polyglot")
import en from "./en"

const DEFAULT_LANG = "en"

export type LocalePhrases = { [key: string] : string | LocalePhrases }

export interface LocaleDefinition {
    [lang: string] : LocalePhrases
}

export class I18n extends Polyglot {

    public currentLocale: string
    public phrases: Object

    constructor () {
        super({
            locale : DEFAULT_LANG,
            phrases : Object.assign({}, en)
        })
    }

    public t (phrase: string, options: Polyglot.InterpolationOptions | number = {}, lang: string = DEFAULT_LANG): string {
        const locale = this.has(phrase, lang) ? lang : this.currentLocale

        if (typeof options === "number") {
            return super.t(`${locale}.${phrase}`, <number>options)
        }
        return super.t(`${locale}.${phrase}`, <Polyglot.InterpolationOptions>options)
    }
    
    private has (phrase: string, lang: string = DEFAULT_LANG): boolean {
        return this.phrases.hasOwnProperty(lang) && (<any>this.phrases)[lang].hasOwnProperty(phrase)
    }
    
}

export default new I18n()
