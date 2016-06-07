"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ListResource_1 = require("../ListResource");
var RestAPI_1 = require("../../api/RestAPI");
var Payouts = (function (_super) {
    __extends(Payouts, _super);
    function Payouts() {
        _super.apply(this, arguments);
        this.urlSegment = "payouts";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    Payouts.prototype.read = function (params) {
        return this._read(params);
    };
    return Payouts;
}(ListResource_1.ListResource));
exports.Payouts = Payouts;
//# sourceMappingURL=Payouts.js.map