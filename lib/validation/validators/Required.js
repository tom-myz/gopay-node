"use strict";
var utils_1 = require("../../utils");
var Required = (function () {
    function Required() {
        this.error = "REQUIRED_VALUE";
    }
    Required.prototype.valid = function (value) {
        return !utils_1.isEmpty(value);
    };
    return Required;
}());
exports.Required = Required;
//# sourceMappingURL=Required.js.map