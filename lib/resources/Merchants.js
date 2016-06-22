"use strict";
const CRUDResource_1 = require("./CRUDResource");
const merchant_1 = require("../validation/schemas/merchant");
class Merchants extends CRUDResource_1.CRUDResource {
    constructor(...args) {
        super(...args);
        this._changePasswordRoute = this.defineRoute("POST", "/(merchants/:merchantId/)change_password");
        this._resetPasswordRoute = this.defineRoute("POST", "/reset_password");
    }
    list(callback, data, token) {
        return this._listRoute(null, data, callback, { token: token });
    }
    create(data, callback, token) {
        return this._createRoute(null, data, callback, { token: token, validationSchema: merchant_1.merchantCreateSchema });
    }
    get(id, callback, token) {
        const params = { id: id };
        return this._getRoute(params, null, callback, { token: token });
    }
    update(id, data, callback, token) {
        const params = { id: id };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: merchant_1.merchantUpdateSchema });
    }
    changePassword(data, callback, merchantId, token) {
        const params = { merchantId: merchantId };
        const validationSchema = merchant_1.merchantChangePasswordSchema(Boolean(token));
        return this._changePasswordRoute(params, data, callback, { token: token, validationSchema: validationSchema });
    }
    resetPassword(data, callback) {
        return this._resetPasswordRoute(null, data, callback, { validationSchema: merchant_1.merchantResetPasswordSchema });
    }
}
Merchants.routeBase = "/merchants";
exports.Merchants = Merchants;
//# sourceMappingURL=Merchants.js.map