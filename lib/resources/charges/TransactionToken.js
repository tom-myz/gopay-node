"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("../CRUDResource");
var RestAPI_1 = require("../../api/RestAPI");
var Validator_1 = require("../../validation/validators/Validator");
var Errors_1 = require("../../errors/Errors");
var tokenCardSchema = {
    cardNumber: [new Validator_1.default.Required(), new Validator_1.default.CardNumber()],
    cvv: [new Validator_1.default.Required(), new Validator_1.default.Numeric()],
    expMonth: [new Validator_1.default.Required(), new Validator_1.default.Numeric()],
    expYear: [new Validator_1.default.Required(), new Validator_1.default.Numeric()]
};
var TransactionToken = (function (_super) {
    __extends(TransactionToken, _super);
    function TransactionToken() {
        _super.apply(this, arguments);
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    TransactionToken.prototype.schemaCreate = function (data) {
        var schema = {
            storeId: [new Validator_1.default.Required(), new Validator_1.default.UUID()],
            type: [new Validator_1.default.Required()]
        };
        switch (data.type) {
            case "card":
                schema.data = tokenCardSchema;
                break;
            default:
        }
        return schema;
    };
    TransactionToken.prototype.url = function (segments) {
        return "/tokens" + (segments.id ? "/" + segments.id : "");
    };
    TransactionToken.prototype.create = function (params) {
        return this._create(params);
    };
    TransactionToken.prototype.read = function (params) {
        return this._read(params);
    };
    TransactionToken.prototype.update = function (params) {
        return Promise.reject(Errors_1.ACTION_NOT_PERMITTED);
    };
    TransactionToken.prototype.delete = function (params) {
        return this._delete(params);
    };
    return TransactionToken;
}(CRUDResource_1.CRUDResource));
exports.TransactionToken = TransactionToken;
//# sourceMappingURL=TransactionToken.js.map