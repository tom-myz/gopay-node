"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var charge_1 = require("../validation/schemas/charge");
var Charges = (function (_super) {
    __extends(Charges, _super);
    function Charges(api) {
        _super.call(this, api);
        this._createRoute = this.defineRoute("POST", "/charges");
    }
    Charges.prototype.list = function (storeId, data, callback, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    };
    Charges.prototype.create = function (storeId, data, callback, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: charge_1.chargeCreateSchema });
    };
    Charges.prototype.get = function (storeId, id, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    };
    Charges.routeBase = "/(merchants/:merchantId/)stores/:storeId/charges";
    return Charges;
}(CRUDResource_1.CRUDResource));
exports.Charges = Charges;
//# sourceMappingURL=Charges.js.map