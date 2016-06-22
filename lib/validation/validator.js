"use strict";
const Validator = require("validatorjs");
const rules_1 = require("./rules");
Validator.register(rules_1.ruleBoolean[0], rules_1.ruleBoolean[1], rules_1.ruleBoolean[2]);
Validator.register(rules_1.ruleObject[0], rules_1.ruleObject[1], rules_1.ruleObject[2]);
Validator.register(rules_1.ruleUUID[0], rules_1.ruleUUID[1], rules_1.ruleUUID[2]);
Validator.register(rules_1.ruleDate[0], rules_1.ruleDate[1], rules_1.ruleDate[2]);
class DataValidator {
    static create(data, schema, messages) {
        return new Validator(data, schema, messages);
    }
}
exports.DataValidator = DataValidator;
//# sourceMappingURL=validator.js.map