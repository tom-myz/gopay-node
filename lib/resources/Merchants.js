"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var merchant_1 = require("../validation/schemas/merchant");
var Merchants = (function (_super) {
    __extends(Merchants, _super);
    function Merchants() {
        _super.apply(this, arguments);
        this._changePasswordRoute = this.defineRoute("POST", "/(merchants/:merchantId/)change_password");
        this._resetPasswordRoute = this.defineRoute("POST", "/reset_password");
    }
    Merchants.prototype.list = function (data, callback, token) {
        return this._listRoute(null, data, callback, { token: token });
    };
    Merchants.prototype.create = function (data, callback, token) {
        return this._createRoute(null, data, callback, { token: token, validationSchema: merchant_1.merchantCreateSchema });
    };
    Merchants.prototype.get = function (id, callback, token) {
        var params = { id: id };
        return this._getRoute(params, null, callback, { token: token });
    };
    Merchants.prototype.update = function (id, data, callback, token) {
        var params = { id: id };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: merchant_1.merchantUpdateSchema });
    };
    Merchants.prototype.changePassword = function (data, callback, merchantId, token) {
        var params = { merchantId: merchantId };
        var validationSchema = merchant_1.merchantChangePasswordSchema(Boolean(token));
        return this._changePasswordRoute(params, data, callback, { token: token, validationSchema: validationSchema });
    };
    Merchants.prototype.resetPassword = function (data, callback) {
        return this._resetPasswordRoute(null, data, callback, { validationSchema: merchant_1.merchantResetPasswordSchema });
    };
    Merchants.routeBase = "/merchants";
    return Merchants;
}(CRUDResource_1.CRUDResource));
exports.Merchants = Merchants;
//# sourceMappingURL=Merchants.js.map