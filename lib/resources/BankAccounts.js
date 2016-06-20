"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var bank_account_1 = require("../validation/schemas/bank-account");
var BankAccounts = (function (_super) {
    __extends(BankAccounts, _super);
    function BankAccounts() {
        _super.apply(this, arguments);
    }
    BankAccounts.prototype.list = function (data, callback, merchantId, token) {
        var params = { merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    };
    BankAccounts.prototype.create = function (data, callback, merchantId, token) {
        var params = { merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: bank_account_1.bankAccountCreateSchema });
    };
    BankAccounts.prototype.get = function (id, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    };
    BankAccounts.prototype.update = function (id, data, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: bank_account_1.bankAccountUpdateSchema });
    };
    BankAccounts.prototype.delete = function (id, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    };
    BankAccounts.routeBase = "/(merchants/:merchantId/)bank_accounts";
    return BankAccounts;
}(CRUDResource_1.CRUDResource));
exports.BankAccounts = BankAccounts;
//# sourceMappingURL=BankAccounts.js.map