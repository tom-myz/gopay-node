"use strict";
var utils_1 = require("../../utils");
var Numeric = (function () {
    function Numeric() {
        this.error = "INVALID_FORMAT_NUMERIC";
    }
    Numeric.prototype.valid = function (value) {
        if (utils_1.isEmpty(value)) {
            return true;
        }
        var v = value.toString();
        return v.match(/^\d+(\.\d+)?$/) !== null;
    };
    return Numeric;
}());
exports.Numeric = Numeric;
//# sourceMappingURL=Numeric.js.map