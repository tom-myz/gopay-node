"use strict";
var I18n_1 = require("../locale/I18n");
var ErrorsConstants_1 = require("./ErrorsConstants");
var CommonError = (function () {
    function CommonError() {
        this.errors = [];
    }
    CommonError.prototype.getLocalised = function (lang) {
        var message = I18n_1.default.t(this.code, undefined, lang);
        var messages = [];
        if (this.code === ErrorsConstants_1.VALIDATION_ERROR) {
            messages = this.errors.map(function (e) {
                var field = Object.keys(e)[0];
                var code = Object.values(e)[0];
                return I18n_1.default.t(code, { field: field }, lang);
            });
        }
        return { message: message, messages: messages };
    };
    return CommonError;
}());
exports.CommonError = CommonError;
//# sourceMappingURL=CommonError.js.map