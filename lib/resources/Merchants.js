"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDResource_1 = require("./CRUDResource");
var merchant_1 = require("../validation/schemas/merchant");

var Merchants = function (_CRUDResource_1$CRUDR) {
    _inherits(Merchants, _CRUDResource_1$CRUDR);

    function Merchants() {
        _classCallCheck(this, Merchants);

        var _this = _possibleConstructorReturn(this, _CRUDResource_1$CRUDR.apply(this, arguments));

        _this._getVerification = _this.defineRoute("GET", Merchants.routeVerification);
        _this._createVerification = _this.defineRoute("POST", Merchants.routeVerification);
        _this._updateVerification = _this.defineRoute("PATCH", Merchants.routeVerification);
        _this._createVerify = _this.defineRoute("POST", "/merchants/:merchantId/verify");
        _this._changePassword = _this.defineRoute("POST", "/merchants/:merchantId/password/reset");
        _this._forgotPassword = _this.defineRoute("POST", "/merchants/password/forgot");
        _this._resetPassword = _this.defineRoute("POST", "/merchants/password/:token");
        _this._getTransactionHistory = _this.defineRoute("GET", "/merchants/:id/(stores/:storeId/)transaction_history");
        _this._ban = _this.defineRoute("POST", Merchants.routeBan);
        _this._unban = _this.defineRoute("DELETE", Merchants.routeBan);
        return _this;
    }

    Merchants.prototype.list = function list(callback, data, token) {
        return this._listRoute(null, data, callback, { token: token });
    };

    Merchants.prototype.create = function create(data, callback, token) {
        return this._createRoute(null, data, callback, { token: token, validationSchema: merchant_1.merchantCreateSchema });
    };

    Merchants.prototype.get = function get(id, callback, token) {
        var params = { id: id };
        return this._getRoute(params, null, callback, { token: token });
    };

    Merchants.prototype.update = function update(id, data, callback, token) {
        var params = { id: id };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: merchant_1.merchantUpdateSchema });
    };

    Merchants.prototype.delete = function _delete(id, callback, token) {
        var params = { id: id };
        return this._deleteRoute(params, null, callback, { token: token });
    };

    Merchants.prototype.createVerification = function createVerification(merchantId, data, callback, token) {
        var params = { merchantId: merchantId };
        return this._createVerification(params, data, callback, { token: token, validationSchema: merchant_1.merchantCreateVerificationSchema });
    };

    Merchants.prototype.getVerification = function getVerification(merchantId, callback, token) {
        var params = { merchantId: merchantId };
        return this._getVerification(params, null, callback, { token: token });
    };

    Merchants.prototype.updateVerification = function updateVerification(merchantId, data, callback, token) {
        var params = { merchantId: merchantId };
        return this._updateVerification(params, data, callback, { token: token, validationSchema: merchant_1.merchantUpdateVerificationSchema });
    };

    Merchants.prototype.verify = function verify(merchantId, data, callback, token) {
        var params = { merchantId: merchantId };
        return this._createVerify(params, data, callback, { token: token, validationSchema: merchant_1.merchantCreateVerifySchema });
    };

    Merchants.prototype.changePassword = function changePassword(data, callback, merchantId, token) {
        var params = { merchantId: merchantId };
        var validationSchema = merchant_1.merchantChangePasswordSchema(Boolean(token));
        return this._changePassword(params, data, callback, { token: token, validationSchema: validationSchema });
    };

    Merchants.prototype.forgotPassword = function forgotPassword(data, callback) {
        return this._forgotPassword(null, data, callback, { validationSchema: merchant_1.merchantForgotPasswordSchema });
    };

    Merchants.prototype.resetPassword = function resetPassword(token, data, callback) {
        return this._resetPassword({ token: token }, data, callback, { validationSchema: merchant_1.merchantResetPasswordSchema });
    };

    Merchants.prototype.getTransactionHistory = function getTransactionHistory(id, data, storeId, callback, token) {
        var params = { id: id, storeId: storeId };
        return this._getTransactionHistory(params, data, callback, { token: token, validationSchema: merchant_1.merchantTransactionHistory });
    };

    Merchants.prototype.ban = function ban(id, data, callback, token) {
        var params = { id: id };
        return this._ban(params, data, callback, { token: token, validationSchema: merchant_1.merchantBanSchema });
    };

    Merchants.prototype.unban = function unban(id, callback, token) {
        var params = { id: id };
        return this._unban(params, null, callback, { token: token });
    };

    return Merchants;
}(CRUDResource_1.CRUDResource);

Merchants.routeBase = "/merchants";
Merchants.routeVerification = "/merchants/:merchantId/verification";
Merchants.routeBan = "/merchants/:merchantId/ban";
exports.Merchants = Merchants;
//# sourceMappingURL=Merchants.js.map