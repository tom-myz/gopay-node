"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var store_1 = require("../validation/schemas/store");
var Stores = (function (_super) {
    __extends(Stores, _super);
    function Stores() {
        _super.apply(this, arguments);
    }
    Stores.prototype.list = function (callback, data, merchantId, token) {
        var params = { merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    };
    Stores.prototype.create = function (data, callback, merchantId, token) {
        var params = { merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: store_1.storeCreateSchema });
    };
    Stores.prototype.get = function (id, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    };
    Stores.prototype.update = function (id, data, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: store_1.storeUpdateSchema });
    };
    Stores.prototype.delete = function (id, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    };
    Stores.routeBase = "/(merchants/:merchantId/)stores";
    return Stores;
}(CRUDResource_1.CRUDResource));
exports.Stores = Stores;
//# sourceMappingURL=Stores.js.map