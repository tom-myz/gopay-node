"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MerchantCRUDResource_1 = require("../MerchantCRUDResource");
var RestAPI_1 = require("../../api/RestAPI");
var Validator_1 = require("../../validation/validators/Validator");
var StoreConfiguration_1 = require("./StoreConfiguration");
var ApplicationToken_1 = require("./ApplicationToken");
var GatewayCredentials_1 = require("../common/GatewayCredentials");
var Store = (function (_super) {
    __extends(Store, _super);
    function Store() {
        _super.apply(this, arguments);
        this.configuration = new StoreConfiguration_1.StoreConfiguration(this.api);
        this.applicationToken = new ApplicationToken_1.ApplicationToken(this.api);
        this.urlSegment = "stores";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    Store.prototype.schemaCreate = function () {
        return {
            gatewayCredentials: GatewayCredentials_1.gatewayCredentialsSchema,
            name: [new Validator_1.default.Required()]
        };
    };
    Store.prototype.schemaUpdate = function () {
        return {
            gatewayCredentials: GatewayCredentials_1.gatewayCredentialsSchema
        };
    };
    return Store;
}(MerchantCRUDResource_1.MerchantCRUDResource));
exports.Store = Store;
//# sourceMappingURL=Store.js.map