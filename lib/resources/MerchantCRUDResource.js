"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var utils_1 = require("../utils");
var MerchantCRUDResource = (function (_super) {
    __extends(MerchantCRUDResource, _super);
    function MerchantCRUDResource() {
        _super.apply(this, arguments);
    }
    MerchantCRUDResource.prototype.url = function (segments) {
        if (utils_1.isEmpty(segments.merchantId)) {
            return "/" + this.urlSegment + (segments.id ? "/" + segments.id : "");
        }
        return "/merchants/" + segments.merchantId + "/" + this.urlSegment + (segments.id ? "/" + segments.id : "");
    };
    MerchantCRUDResource.prototype.create = function (params) {
        return this._create(params);
    };
    MerchantCRUDResource.prototype.read = function (params) {
        return this._read(params);
    };
    MerchantCRUDResource.prototype.update = function (params) {
        return this._update(params);
    };
    MerchantCRUDResource.prototype.delete = function (params) {
        return this._delete(params);
    };
    return MerchantCRUDResource;
}(CRUDResource_1.CRUDResource));
exports.MerchantCRUDResource = MerchantCRUDResource;
//# sourceMappingURL=MerchantCRUDResource.js.map