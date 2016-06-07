"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Polyglot = require("node-polyglot");
var en_1 = require("./en");
var DEFAULT_LANG = "en";
var I18n = (function (_super) {
    __extends(I18n, _super);
    function I18n() {
        _super.call(this, {
            locale: DEFAULT_LANG,
            phrases: Object.assign({}, en_1.default)
        });
    }
    I18n.prototype.t = function (phrase, options, lang) {
        if (options === void 0) { options = {}; }
        if (lang === void 0) { lang = DEFAULT_LANG; }
        var locale = this.has(phrase, lang) ? lang : this.currentLocale;
        if (typeof options === "number") {
            return _super.prototype.t.call(this, locale + "." + phrase, options);
        }
        return _super.prototype.t.call(this, locale + "." + phrase, options);
    };
    I18n.prototype.has = function (phrase, lang) {
        if (lang === void 0) { lang = DEFAULT_LANG; }
        return this.phrases.hasOwnProperty(lang) && this.phrases[lang].hasOwnProperty(phrase);
    };
    return I18n;
}(Polyglot));
exports.I18n = I18n;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new I18n();
//# sourceMappingURL=I18n.js.map