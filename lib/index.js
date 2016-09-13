"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RestAPI_1 = require("./api/RestAPI");
var Authorization_1 = require("./resources/Authorization");
var Merchants_1 = require("./resources/Merchants");
var Stores_1 = require("./resources/Stores");
var Transfers_1 = require("./resources/Transfers");
var Ledgers_1 = require("./resources/Ledgers");
var BankAccounts_1 = require("./resources/BankAccounts");
var WebHooks_1 = require("./resources/WebHooks");
var ApplicationTokens_1 = require("./resources/ApplicationTokens");
var TransactionTokens_1 = require("./resources/TransactionTokens");
var Charges_1 = require("./resources/Charges");
var Credentials_1 = require("./resources/Credentials");
var Refunds_1 = require("./resources/Refunds");

var PaymentsSDK = function PaymentsSDK(options) {
    _classCallCheck(this, PaymentsSDK);

    this.api = new RestAPI_1.RestAPI(options);
    /* Resources */
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
    this.credentials = new Credentials_1.Credentials(this.api);
    this.refunds = new Refunds_1.Refunds(this.api);
};

exports.PaymentsSDK = PaymentsSDK;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PaymentsSDK;
//# sourceMappingURL=index.js.map