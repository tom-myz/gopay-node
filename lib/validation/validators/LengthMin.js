"use strict";
var utils_1 = require("../../utils");
var LengthMin = (function () {
    function LengthMin(min) {
        this.error = "INVALID_FORMAT_LENGTH_MIN";
        this.min = min;
    }
    LengthMin.prototype.valid = function (value) {
        if (utils_1.isEmpty(value)) {
            return true;
        }
        var v = value.toString();
        return v.length >= this.min;
    };
    return LengthMin;
}());
exports.LengthMin = LengthMin;
//# sourceMappingURL=LengthMin.js.map