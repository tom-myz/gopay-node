"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CommonError_1 = require("./CommonError");
var ValidationError = (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(errors) {
        _super.call(this);
        this.code = "VALIDATION_ERROR";
        this.errors = errors;
    }
    return ValidationError;
}(CommonError_1.CommonError));
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map