"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RestAPI_1 = require("../../api/RestAPI");
var Validator_1 = require("../../validation/validators/Validator");
var StoreCRUDResource_1 = require("../StoreCRUDResource");
var Errors_1 = require("../../errors/Errors");
var StoreConfiguration = (function (_super) {
    __extends(StoreConfiguration, _super);
    function StoreConfiguration() {
        _super.apply(this, arguments);
        this.urlSegment = "configuration";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    StoreConfiguration.prototype.schemaUpdate = function () {
        return {
            domains: [new Validator_1.default.List()],
            paymentTypes: [new Validator_1.default.List()]
        };
    };
    StoreConfiguration.prototype.create = function (params) {
        return Promise.reject(Errors_1.ACTION_NOT_PERMITTED);
    };
    StoreConfiguration.prototype.delete = function (params) {
        return Promise.reject(Errors_1.ACTION_NOT_PERMITTED);
    };
    return StoreConfiguration;
}(StoreCRUDResource_1.StoreCRUDResource));
exports.StoreConfiguration = StoreConfiguration;
//# sourceMappingURL=StoreConfiguration.js.map