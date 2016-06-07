import Polyglot = require("node-polyglot");
export declare type LocalePhrases = {
    [key: string]: string | LocalePhrases;
};
export interface LocaleDefinition {
    [lang: string]: LocalePhrases;
}
export declare class I18n extends Polyglot {
    currentLocale: string;
    phrases: Object;
    constructor();
    t(phrase: string, options?: Polyglot.InterpolationOptions | number, lang?: string): string;
    private has(phrase, lang?);
}
declare var _default: I18n;
export default _default;
