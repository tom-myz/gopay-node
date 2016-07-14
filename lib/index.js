"use strict";
const RestAPI_1 = require("./api/RestAPI");
const Authorization_1 = require("./resources/Authorization");
const Merchants_1 = require("./resources/Merchants");
const Stores_1 = require("./resources/Stores");
const Transfers_1 = require("./resources/Transfers");
const Ledgers_1 = require("./resources/Ledgers");
const BankAccounts_1 = require("./resources/BankAccounts");
const WebHooks_1 = require("./resources/WebHooks");
const ApplicationTokens_1 = require("./resources/ApplicationTokens");
const TransactionTokens_1 = require("./resources/TransactionTokens");
const Charges_1 = require("./resources/Charges");
class PaymentsSDK {
    constructor(options) {
        this.api = new RestAPI_1.RestAPI(options);
        this.authorization = new Authorization_1.Authorization(this.api);
        this.merchants = new Merchants_1.Merchants(this.api);
        this.stores = new Stores_1.Stores(this.api);
        this.charges = new Charges_1.Charges(this.api);
        this.transfers = new Transfers_1.Transfers(this.api);
        this.ledgers = new Ledgers_1.Ledgers(this.api);
        this.bankAccounts = new BankAccounts_1.BankAccounts(this.api);
        this.webHooks = new WebHooks_1.WebHooks(this.api);
        this.applicationTokens = new ApplicationTokens_1.ApplicationTokens(this.api);
        this.transactionTokens = new TransactionTokens_1.TransactionTokens(this.api);
    }
}
exports.PaymentsSDK = PaymentsSDK;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PaymentsSDK;
//# sourceMappingURL=index.js.map