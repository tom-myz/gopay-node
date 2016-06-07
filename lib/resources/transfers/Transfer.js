"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RestAPI_1 = require("../../api/RestAPI");
var Validator_1 = require("../../validation/validators/Validator");
var Errors_1 = require("../../errors/Errors");
var MerchantCRUDResource_1 = require("../MerchantCRUDResource");
var Transfer = (function (_super) {
    __extends(Transfer, _super);
    function Transfer() {
        _super.apply(this, arguments);
        this.urlSegment = "transfers";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    Transfer.prototype.schemaCreate = function () {
        return {
            daysPrior: [new Validator_1.default.Required(), new Validator_1.default.Numeric()]
        };
    };
    Transfer.prototype.create = function (params) {
        return this._create(params);
    };
    Transfer.prototype.read = function (params) {
        return this._read(params);
    };
    Transfer.prototype.update = function (params) {
        return Promise.reject(Errors_1.ACTION_NOT_PERMITTED);
    };
    Transfer.prototype.delete = function (params) {
        return Promise.reject(Errors_1.ACTION_NOT_PERMITTED);
    };
    return Transfer;
}(MerchantCRUDResource_1.MerchantCRUDResource));
exports.Transfer = Transfer;
//# sourceMappingURL=Transfer.js.map