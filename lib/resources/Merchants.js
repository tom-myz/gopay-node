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

        _this._changePasswordRoute = _this.defineRoute("POST", "/(merchants/:merchantId/)change_password");
        _this._resetPasswordRoute = _this.defineRoute("POST", "/reset_password");
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

    Merchants.prototype.changePassword = function changePassword(data, callback, merchantId, token) {
        var params = { merchantId: merchantId };
        var validationSchema = merchant_1.merchantChangePasswordSchema(Boolean(token));
        return this._changePasswordRoute(params, data, callback, { token: token, validationSchema: validationSchema });
    };

    Merchants.prototype.resetPassword = function resetPassword(data, callback) {
        return this._resetPasswordRoute(null, data, callback, { validationSchema: merchant_1.merchantResetPasswordSchema });
    };

    return Merchants;
}(CRUDResource_1.CRUDResource);

Merchants.routeBase = "/merchants";
exports.Merchants = Merchants;
//# sourceMappingURL=Merchants.js.map