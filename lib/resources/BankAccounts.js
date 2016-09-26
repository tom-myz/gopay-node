"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDResource_1 = require("./CRUDResource");

var BankAccounts = function (_CRUDResource_1$CRUDR) {
    (0, _inherits3.default)(BankAccounts, _CRUDResource_1$CRUDR);

    function BankAccounts() {
        (0, _classCallCheck3.default)(this, BankAccounts);
        return (0, _possibleConstructorReturn3.default)(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    BankAccounts.prototype.list = function list(data, callback) {
        return this._listRoute()(data, callback);
    };

    BankAccounts.prototype.create = function create(data, callback) {
        return this._createRoute(BankAccounts.requiredParams)(data, callback);
    };

    BankAccounts.prototype.get = function get(id, data, callback) {
        return this._getRoute()(data, callback, ["id"], id);
    };

    BankAccounts.prototype.update = function update(id, data, callback) {
        return this._updateRoute()(data, callback, ["id"], id);
    };

    BankAccounts.prototype.delete = function _delete(id, data, callback) {
        return this._deleteRoute()(data, callback, ["id"], id);
    };

    BankAccounts.prototype.getPrimary = function getPrimary(data, callback) {
        return this.defineRoute("GET", this._routeBase + "/primary")(data, callback);
    };

    return BankAccounts;
}(CRUDResource_1.CRUDResource);

BankAccounts.requiredParams = ["accountNumber", "country", "currency", "holderName", "bankName"];
BankAccounts.routeBase = "/bank_accounts";
exports.BankAccounts = BankAccounts;
//# sourceMappingURL=BankAccounts.js.map