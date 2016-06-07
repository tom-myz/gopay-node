"use strict";
var utils_1 = require("../../utils");
var UUID = (function () {
    function UUID() {
        this.error = "INVALID_FORMAT_UUID";
    }
    UUID.prototype.valid = function (value) {
        if (utils_1.isEmpty(value)) {
            return true;
        }
        var v = value.toString();
        return v.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i) !== null;
    };
    return UUID;
}());
exports.UUID = UUID;
//# sourceMappingURL=UUID.js.map