"use strict";
var Validation = (function () {
    function Validation() {
    }
    Validation.validate = function (obj, schema, prefix) {
        if (prefix === void 0) { prefix = ""; }
        var errors = [];
        Object.keys(schema).forEach(function (k) {
            var value = obj[k];
            var validators = schema[k] || [];
            if (Array.isArray(validators)) {
                for (var _i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
                    var validator = validators_1[_i];
                    if (!validator.valid(value)) {
                        errors.push((_a = {}, _a["" + prefix + k] = validator.error, _a));
                        break;
                    }
                }
            }
            else {
                Validation.validate(value || {}, validators, "" + prefix + k + ".").forEach(function (e) { return errors.push(e); });
            }
            var _a;
        });
        return errors;
    };
    return Validation;
}());
exports.Validation = Validation;
//# sourceMappingURL=Validation.js.map