"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RestAPI_1 = require("../../api/RestAPI");
var MerchantListResource_1 = require("../MerchantListResource");
var Transfers = (function (_super) {
    __extends(Transfers, _super);
    function Transfers() {
        _super.apply(this, arguments);
        this.urlSegment = "transfers";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    Transfers.prototype.read = function (params) {
        return this._read(params);
    };
    return Transfers;
}(MerchantListResource_1.MerchantListResource));
exports.Transfers = Transfers;
//# sourceMappingURL=Transfers.js.map