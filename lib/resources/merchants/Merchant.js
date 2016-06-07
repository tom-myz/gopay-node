"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("../CRUDResource");
var RestAPI_1 = require("../../api/RestAPI");
var Validator_1 = require("../../validation/validators/Validator");
var ContactInfo_1 = require("../common/ContactInfo");
var GatewayCredentials_1 = require("../common/GatewayCredentials");
var Merchant = (function (_super) {
    __extends(Merchant, _super);
    function Merchant() {
        _super.apply(this, arguments);
        this.urlSegment = "merchants";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    Merchant.prototype.schemaCreate = function () {
        return {
            address: ContactInfo_1.contactInfoSchema,
            email: [new Validator_1.default.Required(), new Validator_1.default.Email()],
            gatewayCredentials: GatewayCredentials_1.gatewayCredentialsSchema,
            password: [new Validator_1.default.Required(), new Validator_1.default.LengthBetween(8, 30)]
        };
    };
    Merchant.prototype.schemaUpdate = function () {
        return {
            address: ContactInfo_1.contactInfoSchema,
            email: [new Validator_1.default.Email()],
            gatewayCredentials: GatewayCredentials_1.gatewayCredentialsSchema
        };
    };
    Merchant.prototype.create = function (params) {
        return this._create(params);
    };
    Merchant.prototype.read = function (params) {
        return this._read(params);
    };
    Merchant.prototype.update = function (params) {
        return this._update(params);
    };
    Merchant.prototype.delete = function (params) {
        return this._delete(params);
    };
    return Merchant;
}(CRUDResource_1.CRUDResource));
exports.Merchant = Merchant;
//# sourceMappingURL=Merchant.js.map