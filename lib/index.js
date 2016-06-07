"use strict";
var config_1 = require("./config");
var RestAPI_1 = require("./api/RestAPI");
var Authorization_1 = require("./resources/Authorization");
var Merchant_1 = require("./resources/merchants/Merchant");
var Merchants_1 = require("./resources/merchants/Merchants");
var Store_1 = require("./resources/stores/Store");
var Stores_1 = require("./resources/stores/Stores");
var TransactionToken_1 = require("./resources/charges/TransactionToken");
var Charge_1 = require("./resources/charges/Charge");
var Charges_1 = require("./resources/charges/Charges");
var Transfer_1 = require("./resources/transfers/Transfer");
var Transfers_1 = require("./resources/transfers/Transfers");
var Payouts_1 = require("./resources/payouts/Payouts");
var BankAccount_1 = require("./resources/bankAccounts/BankAccount");
var BankAccounts_1 = require("./resources/bankAccounts/BankAccounts");
var PaymentsSDK = (function () {
    function PaymentsSDK(options) {
        this.api = new RestAPI_1.RestAPI(this.getOptions(options));
        this.authorization = new Authorization_1.Authorization(this.api);
        this.token = new TransactionToken_1.TransactionToken(this.api);
        this.merchant = new Merchant_1.Merchant(this.api);
        this.merchants = new Merchants_1.Merchants(this.api);
        this.store = new Store_1.Store(this.api);
        this.stores = new Stores_1.Stores(this.api);
        this.charge = new Charge_1.Charge(this.api);
        this.charges = new Charges_1.Charges(this.api);
        this.transfer = new Transfer_1.Transfer(this.api);
        this.transfers = new Transfers_1.Transfers(this.api);
        this.payouts = new Payouts_1.Payouts(this.api);
        this.bankAccount = new BankAccount_1.BankAccount(this.api);
        this.bankAccounts = new BankAccounts_1.BankAccounts(this.api);
    }
    PaymentsSDK.prototype.getOptions = function (options) {
        if (options === void 0) { options = {}; }
        return {
            appId: options.appId || process.env[config_1.default.envAppId],
            camel: options.camelCase || false,
            endpoint: options.endpoint || config_1.default.endpoint,
            secret: options.secret || process.env[config_1.default.envSecret],
            token: options.token
        };
    };
    return PaymentsSDK;
}());
exports.PaymentsSDK = PaymentsSDK;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PaymentsSDK;
//# sourceMappingURL=index.js.map