"use strict";
var utils_1 = require("../../utils");
var LengthMax = (function () {
    function LengthMax(max) {
        this.error = "INVALID_FORMAT_LENGTH_MAX";
        this.max = max;
    }
    LengthMax.prototype.valid = function (value) {
        if (utils_1.isEmpty(value)) {
            return true;
        }
        var v = value.toString();
        return v.length <= this.max;
    };
    return LengthMax;
}());
exports.LengthMax = LengthMax;
//# sourceMappingURL=LengthMax.js.map