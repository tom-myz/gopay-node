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
var BankAccount = (function (_super) {
    __extends(BankAccount, _super);
    function BankAccount() {
        _super.apply(this, arguments);
        this.urlSegment = "bank_accounts";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    BankAccount.prototype.schemaCreate = function () {
        return {
            accountNumber: [new Validator_1.default.Required()],
            bankName: [new Validator_1.default.Required()],
            currency: [new Validator_1.default.Required(), new Validator_1.default.LengthMin(3)],
            holderName: [new Validator_1.default.Required()]
        };
    };
    BankAccount.prototype.create = function (params) {
        return this._create(params);
    };
    BankAccount.prototype.read = function (params) {
        return this._read(params);
    };
    BankAccount.prototype.update = function (params) {
        return this._update(params);
    };
    BankAccount.prototype.delete = function (params) {
        return Promise.reject(Errors_1.ACTION_NOT_PERMITTED);
    };
    return BankAccount;
}(MerchantCRUDResource_1.MerchantCRUDResource));
exports.BankAccount = BankAccount;
//# sourceMappingURL=BankAccount.js.map