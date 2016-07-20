"use strict";
const CRUDResource_1 = require("./CRUDResource");
const merchant_1 = require("../validation/schemas/merchant");
class Merchants extends CRUDResource_1.CRUDResource {
    constructor(...args) {
        super(...args);
        this._getVerification = this.defineRoute("GET", Merchants.routeVerification);
        this._createVerification = this.defineRoute("POST", Merchants.routeVerification);
        this._updateVerification = this.defineRoute("PATCH", Merchants.routeVerification);
        this._createVerify = this.defineRoute("POST", "/merchants/:merchantId/verify");
        this._changePassword = this.defineRoute("POST", "/merchants/:merchantId/password/reset");
        this._forgotPassword = this.defineRoute("POST", "/merchants/password/forgot");
        this._resetPassword = this.defineRoute("POST", "/merchants/password/:token");
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
    delete(id, callback, token) {
        const params = { id: id };
        return this._deleteRoute(params, null, callback, { token: token });
    }
    createVerification(merchantId, data, callback, token) {
        const params = { merchantId: merchantId };
        return this._createVerification(params, data, callback, { token: token, validationSchema: merchant_1.merchantCreateVerificationSchema });
    }
    getVerification(merchantId, callback, token) {
        const params = { merchantId: merchantId };
        return this._getVerification(params, null, callback, { token: token });
    }
    updateVerification(merchantId, data, callback, token) {
        const params = { merchantId: merchantId };
        return this._updateVerification(params, data, callback, { token: token, validationSchema: merchant_1.merchantUpdateVerificationSchema });
    }
    verify(merchantId, data, callback, token) {
        const params = { merchantId: merchantId };
        return this._createVerify(params, data, callback, { token: token, validationSchema: merchant_1.merchantCreateVerifySchema });
    }
    changePassword(data, callback, merchantId, token) {
        const params = { merchantId: merchantId };
        const validationSchema = merchant_1.merchantChangePasswordSchema(Boolean(token));
        return this._changePassword(params, data, callback, { token: token, validationSchema: validationSchema });
    }
    forgotPassword(data, callback) {
        return this._forgotPassword(null, data, callback, { validationSchema: merchant_1.merchantForgotPasswordSchema });
    }
    resetPassword(token, data, callback) {
        return this._resetPassword({ token: token }, data, callback, { validationSchema: merchant_1.merchantResetPasswordSchema });
    }
}
Merchants.routeBase = "/merchants";
Merchants.routeVerification = "/merchants/:merchantId/verification";
exports.Merchants = Merchants;
//# sourceMappingURL=Merchants.js.map