"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentsSDK_1 = require("./PaymentsSDK");
// Resources
var Balance_1 = require("./resources/Balance");
var BankAccounts_1 = require("./resources/BankAccounts");
var Charges_1 = require("./resources/Charges");
var CheckoutInfo_1 = require("./resources/CheckoutInfo");
var Merchants_1 = require("./resources/Merchants");
var Refunds_1 = require("./resources/Refunds");
var Stores_1 = require("./resources/Stores");
var Subscriptions_1 = require("./resources/Subscriptions");
var TransactionsHistory_1 = require("./resources/TransactionsHistory");
var TransactionTokens_1 = require("./resources/TransactionTokens");
var Transfers_1 = require("./resources/Transfers");
var Verification_1 = require("./resources/Verification");
var WebHooks_1 = require("./resources/WebHooks");

var SDK = function (_PaymentsSDK_1$Paymen) {
    (0, _inherits3.default)(SDK, _PaymentsSDK_1$Paymen);

    function SDK(options) {
        (0, _classCallCheck3.default)(this, SDK);

        var _this = (0, _possibleConstructorReturn3.default)(this, _PaymentsSDK_1$Paymen.call(this, options));

        _this.balance = new Balance_1.Balance(_this.api);
        _this.bankAccounts = new BankAccounts_1.BankAccounts(_this.api);
        _this.charges = new Charges_1.Charges(_this.api);
        _this.checkoutInfo = new CheckoutInfo_1.CheckoutInfo(_this.api);
        _this.merchants = new Merchants_1.Merchants(_this.api);
        _this.refunds = new Refunds_1.Refunds(_this.api);
        _this.stores = new Stores_1.Stores(_this.api);
        _this.subscriptions = new Subscriptions_1.Subscriptions(_this.api);
        _this.transactionsHistory = new TransactionsHistory_1.TransactionsHistory(_this.api);
        _this.transactionTokens = new TransactionTokens_1.TransactionTokens(_this.api);
        _this.transfers = new Transfers_1.Transfers(_this.api);
        _this.verification = new Verification_1.Verification(_this.api);
        _this.webHooks = new WebHooks_1.WebHooks(_this.api);
        return _this;
    }

    return SDK;
}(PaymentsSDK_1.PaymentsSDK);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SDK;
//# sourceMappingURL=index.js.map