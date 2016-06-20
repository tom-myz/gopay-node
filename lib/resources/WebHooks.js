"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var webhook_1 = require("../validation/schemas/webhook");
var WebHooks = (function (_super) {
    __extends(WebHooks, _super);
    function WebHooks() {
        _super.apply(this, arguments);
    }
    WebHooks.prototype.list = function (storeId, data, callback, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    };
    WebHooks.prototype.create = function (storeId, data, callback, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: webhook_1.webHookCreateSchema });
    };
    WebHooks.prototype.get = function (storeId, id, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    };
    WebHooks.prototype.update = function (storeId, id, data, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: webhook_1.webHookUpdateSchema });
    };
    WebHooks.prototype.delete = function (storeId, id, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    };
    WebHooks.routeBase = "/(merchants/:merchantId/)stores/:storeId/webhooks";
    return WebHooks;
}(CRUDResource_1.CRUDResource));
exports.WebHooks = WebHooks;
//# sourceMappingURL=WebHooks.js.map