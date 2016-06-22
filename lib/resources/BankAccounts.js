"use strict";
const CRUDResource_1 = require("./CRUDResource");
const bank_account_1 = require("../validation/schemas/bank-account");
class BankAccounts extends CRUDResource_1.CRUDResource {
    list(callback, data, merchantId, token) {
        const params = { merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    }
    create(data, callback, merchantId, token) {
        const params = { merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: bank_account_1.bankAccountCreateSchema });
    }
    get(id, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    }
    update(id, data, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: bank_account_1.bankAccountUpdateSchema });
    }
    delete(id, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    }
}
BankAccounts.routeBase = "/(merchants/:merchantId/)bank_accounts";
exports.BankAccounts = BankAccounts;
//# sourceMappingURL=BankAccounts.js.map