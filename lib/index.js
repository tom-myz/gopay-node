"use strict";
var RestAPI_1 = require("./api/RestAPI");
var Authorization_1 = require("./resources/Authorization");
var Merchants_1 = require("./resources/Merchants");
var Stores_1 = require("./resources/Stores");
var Transfers_1 = require("./resources/Transfers");
var Payouts_1 = require("./resources/Payouts");
var BankAccounts_1 = require("./resources/BankAccounts");
var WebHooks_1 = require("./resources/WebHooks");
var ApplicationTokens_1 = require("./resources/ApplicationTokens");
var Charges_1 = require("./resources/Charges");
var Validator = require("validatorjs");
var rules_1 = require("./validation/rules");
Validator.register(rules_1.ruleBoolean[0], rules_1.ruleBoolean[1], rules_1.ruleBoolean[2]);
Validator.register(rules_1.ruleObject[0], rules_1.ruleObject[1], rules_1.ruleObject[2]);
Validator.register(rules_1.ruleUUID[0], rules_1.ruleUUID[1], rules_1.ruleUUID[2]);
var PaymentsSDK = (function () {
    function PaymentsSDK(options) {
        this.api = new RestAPI_1.RestAPI(options);
        this.authorization = new Authorization_1.Authorization(this.api);
        this.merchants = new Merchants_1.Merchants(this.api);
        this.stores = new Stores_1.Stores(this.api);
        this.charges = new Charges_1.Charges(this.api);
        this.transfers = new Transfers_1.Transfers(this.api);
        this.payouts = new Payouts_1.Payouts(this.api);
        this.bankAccounts = new BankAccounts_1.BankAccounts(this.api);
        this.webHooks = new WebHooks_1.WebHooks(this.api);
        this.applicationTokens = new ApplicationTokens_1.ApplicationTokens(this.api);
    }
    return PaymentsSDK;
}());
exports.PaymentsSDK = PaymentsSDK;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PaymentsSDK;
//# sourceMappingURL=index.js.map