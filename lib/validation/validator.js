"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidatorJs = require("validatorjs");
var rules_1 = require("./rules");
/* Set up custom validators */
ValidatorJs.register(rules_1.ruleBoolean[0], rules_1.ruleBoolean[1], rules_1.ruleBoolean[2]);
ValidatorJs.register(rules_1.ruleObject[0], rules_1.ruleObject[1], rules_1.ruleObject[2]);
ValidatorJs.register(rules_1.ruleUUID[0], rules_1.ruleUUID[1], rules_1.ruleUUID[2]);
ValidatorJs.register(rules_1.ruleDate[0], rules_1.ruleDate[1], rules_1.ruleDate[2]);

var DataValidator = function () {
    function DataValidator() {
        _classCallCheck(this, DataValidator);
    }

    DataValidator.create = function create(data, schema, messages) {
        return new ValidatorJs(data, schema, messages);
    };

    return DataValidator;
}();

exports.DataValidator = DataValidator;
//# sourceMappingURL=validator.js.map