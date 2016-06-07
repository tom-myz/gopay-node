"use strict";
var utils_1 = require("../../utils");
var List = (function () {
    function List(validators) {
        if (validators === void 0) { validators = []; }
        this.error = "INVALID_FORMAT_LIST";
        this.validators = validators;
    }
    List.prototype.valid = function (value) {
        var _this = this;
        if (utils_1.isEmpty(value)) {
            return true;
        }
        if (!Array.isArray(value)) {
            return false;
        }
        return value.reduce(function (r1, v) {
            if (r1 === false) {
                return false;
            }
            return _this.validators.reduce(function (r2, validator) {
                if (r2 === false) {
                    return false;
                }
                return validator.valid(v);
            }, true);
        }, true);
    };
    return List;
}());
exports.List = List;
//# sourceMappingURL=List.js.map