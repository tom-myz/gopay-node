"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var transfer_1 = require("../validation/schemas/transfer");
var Transfers = (function (_super) {
    __extends(Transfers, _super);
    function Transfers() {
        _super.apply(this, arguments);
    }
    Transfers.prototype.list = function (data, callback, merchantId, token) {
        var params = { merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    };
    Transfers.prototype.create = function (data, callback, merchantId, token) {
        var params = { merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: transfer_1.transferSchema });
    };
    Transfers.prototype.get = function (id, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    };
    Transfers.prototype.update = function (id, data, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: transfer_1.transferSchema });
    };
    Transfers.routeBase = "/(merchants/:merchantId/)transfers";
    return Transfers;
}(CRUDResource_1.CRUDResource));
exports.Transfers = Transfers;
//# sourceMappingURL=Transfers.js.map