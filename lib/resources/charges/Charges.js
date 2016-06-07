"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ListResource_1 = require("../ListResource");
var RestAPI_1 = require("../../api/RestAPI");
var Charges = (function (_super) {
    __extends(Charges, _super);
    function Charges() {
        _super.apply(this, arguments);
        this.urlSegment = "charges";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    Charges.prototype.read = function (params) {
        return this._read(params);
    };
    return Charges;
}(ListResource_1.ListResource));
exports.Charges = Charges;
//# sourceMappingURL=Charges.js.map