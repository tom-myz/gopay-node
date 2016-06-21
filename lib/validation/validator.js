"use strict";
var Validator = require("validatorjs");
var rules_1 = require("./rules");
Validator.register(rules_1.ruleBoolean[0], rules_1.ruleBoolean[1], rules_1.ruleBoolean[2]);
Validator.register(rules_1.ruleObject[0], rules_1.ruleObject[1], rules_1.ruleObject[2]);
Validator.register(rules_1.ruleUUID[0], rules_1.ruleUUID[1], rules_1.ruleUUID[2]);
Validator.register(rules_1.ruleDate[0], rules_1.ruleDate[1], rules_1.ruleDate[2]);
var DataValidator = (function () {
    function DataValidator() {
    }
    DataValidator.create = function (data, schema, messages) {
        return new Validator(data, schema, messages);
    };
    return DataValidator;
}());
exports.DataValidator = DataValidator;
//# sourceMappingURL=validator.js.map