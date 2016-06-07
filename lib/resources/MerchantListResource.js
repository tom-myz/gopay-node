"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ListResource_1 = require("./ListResource");
var utils_1 = require("../utils");
var MerchantListResource = (function (_super) {
    __extends(MerchantListResource, _super);
    function MerchantListResource() {
        _super.apply(this, arguments);
    }
    MerchantListResource.prototype.url = function (segments) {
        if (utils_1.isEmpty(segments.merchantId)) {
            return "/" + this.urlSegment;
        }
        return "/merchants/" + segments.merchantId + "/" + this.urlSegment;
    };
    MerchantListResource.prototype.read = function (params) {
        return this._read(params);
    };
    return MerchantListResource;
}(ListResource_1.ListResource));
exports.MerchantListResource = MerchantListResource;
//# sourceMappingURL=MerchantListResource.js.map