"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var ApplicationTokens = (function (_super) {
    __extends(ApplicationTokens, _super);
    function ApplicationTokens() {
        _super.apply(this, arguments);
        this.routeBase = "/(merchants/:merchantId/)stores/:storeId/app_tokens";
    }
    ApplicationTokens.prototype.list = function (storeId, data, callback, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    };
    ApplicationTokens.prototype.create = function (storeId, callback, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId };
        return this._createRoute(params, null, callback, { token: token });
    };
    ApplicationTokens.prototype.delete = function (storeId, id, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    };
    return ApplicationTokens;
}(CRUDResource_1.CRUDResource));
exports.ApplicationTokens = ApplicationTokens;
//# sourceMappingURL=ApplicationTokens.js.map