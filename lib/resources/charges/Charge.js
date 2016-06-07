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
var Charge = (function (_super) {
    __extends(Charge, _super);
    function Charge() {
        _super.apply(this, arguments);
        this.urlSegment = "charges";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    Charge.prototype.schemaCreate = function () {
        return {
            amount: [new Validator_1.default.Required(), new Validator_1.default.Numeric()],
            currency: [new Validator_1.default.Required(), new Validator_1.default.LengthMin(3)],
            token: [new Validator_1.default.Required()]
        };
    };
    Charge.prototype.create = function (params) {
        return this._create(params);
    };
    Charge.prototype.read = function (params) {
        return this._read(params);
    };
    Charge.prototype.update = function (params) {
        return this._update(params);
    };
    Charge.prototype.delete = function (params) {
        return Promise.reject(Errors_1.ACTION_NOT_PERMITTED);
    };
    return Charge;
}(CRUDResource_1.CRUDResource));
exports.Charge = Charge;
//# sourceMappingURL=Charge.js.map