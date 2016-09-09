"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDResource_1 = require("./CRUDResource");
var webhook_1 = require("../validation/schemas/webhook");

var WebHooks = function (_CRUDResource_1$CRUDR) {
    _inherits(WebHooks, _CRUDResource_1$CRUDR);

    function WebHooks() {
        _classCallCheck(this, WebHooks);

        return _possibleConstructorReturn(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    WebHooks.prototype.list = function list(storeId, data, callback, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    };

    WebHooks.prototype.create = function create(storeId, data, callback, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: webhook_1.webHookCreateSchema });
    };

    WebHooks.prototype.get = function get(storeId, id, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    };

    WebHooks.prototype.update = function update(storeId, id, data, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: webhook_1.webHookUpdateSchema });
    };

    WebHooks.prototype.delete = function _delete(storeId, id, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    };

    return WebHooks;
}(CRUDResource_1.CRUDResource);

WebHooks.routeBase = "/(merchants/:merchantId/)stores/:storeId/webhooks";
exports.WebHooks = WebHooks;
//# sourceMappingURL=WebHooks.js.map