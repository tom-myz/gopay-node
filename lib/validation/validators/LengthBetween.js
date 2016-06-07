"use strict";
var utils_1 = require("../../utils");
var LengthBetween = (function () {
    function LengthBetween(min, max) {
        this.error = "INVALID_FORMAT_LENGTH_BETWEEN";
        this.min = min;
        this.max = max;
    }
    LengthBetween.prototype.valid = function (value) {
        if (utils_1.isEmpty(value)) {
            return true;
        }
        var v = value.toString();
        return v.length >= this.min && v.length <= this.max;
    };
    return LengthBetween;
}());
exports.LengthBetween = LengthBetween;
//# sourceMappingURL=LengthBetween.js.map