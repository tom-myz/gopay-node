"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var Payouts = (function (_super) {
    __extends(Payouts, _super);
    function Payouts() {
        _super.apply(this, arguments);
    }
    Payouts.prototype.list = function (data, callback, token) {
        return this._listRoute(null, data, callback, { token: token });
    };
    Payouts.routeBase = "/payouts";
    return Payouts;
}(CRUDResource_1.CRUDResource));
exports.Payouts = Payouts;
//# sourceMappingURL=Payouts.js.map