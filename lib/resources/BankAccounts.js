"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDResource_1 = require("./CRUDResource");
var bank_account_1 = require("../validation/schemas/bank-account");

var BankAccounts = function (_CRUDResource_1$CRUDR) {
    _inherits(BankAccounts, _CRUDResource_1$CRUDR);

    function BankAccounts() {
        _classCallCheck(this, BankAccounts);

        return _possibleConstructorReturn(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    BankAccounts.prototype.list = function list(callback, data, merchantId, token) {
        var params = { merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    };

    BankAccounts.prototype.create = function create(data, callback, merchantId, token) {
        var params = { merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: bank_account_1.bankAccountCreateSchema });
    };

    BankAccounts.prototype.get = function get(id, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    };

    BankAccounts.prototype.update = function update(id, data, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: bank_account_1.bankAccountUpdateSchema });
    };

    BankAccounts.prototype.delete = function _delete(id, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    };

    return BankAccounts;
}(CRUDResource_1.CRUDResource);

BankAccounts.routeBase = "/(merchants/:merchantId/)bank_accounts";
exports.BankAccounts = BankAccounts;
//# sourceMappingURL=BankAccounts.js.map