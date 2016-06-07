"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ListResource_1 = require("../ListResource");
var RestAPI_1 = require("../../api/RestAPI");
var Merchants = (function (_super) {
    __extends(Merchants, _super);
    function Merchants() {
        _super.apply(this, arguments);
        this.urlSegment = "merchants";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    Merchants.prototype.read = function (params) {
        return this._read(params);
    };
    return Merchants;
}(ListResource_1.ListResource));
exports.Merchants = Merchants;
//# sourceMappingURL=Merchants.js.map