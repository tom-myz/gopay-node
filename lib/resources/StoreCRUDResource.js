"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var utils_1 = require("../utils");
var StoreCRUDResource = (function (_super) {
    __extends(StoreCRUDResource, _super);
    function StoreCRUDResource() {
        _super.apply(this, arguments);
        this.single = true;
    }
    StoreCRUDResource.prototype.url = function (segments) {
        var id = (!this.single && segments.id) ? "/" + segments.id : "";
        if (utils_1.isEmpty(segments.merchantId)) {
            return "/stores/" + segments.storeId + "/" + this.urlSegment + id;
        }
        return "/merchants/" + segments.merchantId + "/stores/" + segments.storeId + "/" + this.urlSegment + id;
    };
    StoreCRUDResource.prototype.read = function (params) {
        return this._read(params);
    };
    StoreCRUDResource.prototype.update = function (params) {
        return this._update(params);
    };
    StoreCRUDResource.prototype.create = function (params) {
        return this._create(params);
    };
    StoreCRUDResource.prototype.delete = function (params) {
        return this._delete(params);
    };
    return StoreCRUDResource;
}(CRUDResource_1.CRUDResource));
exports.StoreCRUDResource = StoreCRUDResource;
//# sourceMappingURL=StoreCRUDResource.js.map