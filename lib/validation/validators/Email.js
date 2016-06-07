"use strict";
var utils_1 = require("../../utils");
var Email = (function () {
    function Email() {
        this.error = "INVALID_FORMAT_EMAIL";
    }
    Email.prototype.valid = function (value) {
        if (utils_1.isEmpty(value)) {
            return true;
        }
        var v = value.toString();
        return v.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i) !== null;
    };
    return Email;
}());
exports.Email = Email;
//# sourceMappingURL=Email.js.map