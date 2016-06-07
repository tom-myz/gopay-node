"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CommonError_1 = require("./CommonError");
var utils_1 = require("../utils");
var Errors = require("./ErrorsConstants");
var ResponseError = (function (_super) {
    __extends(ResponseError, _super);
    function ResponseError(error) {
        _super.call(this);
        this._raw = error;
        if (!utils_1.isEmpty(error)) {
            this.parseError();
        }
        else {
            this.code = Errors.UNKNOWN;
        }
    }
    ResponseError.prototype.parseErrorByBody = function (body) {
        if (utils_1.isEmpty(body.errors)) {
            this.code = body.key;
        }
        else {
            this.code = Errors.VALIDATION_ERROR;
            this.errors = body.errors.map(function (e) {
                return (_a = {}, _a[e.field] = e.reason, _a);
                var _a;
            });
        }
    };
    ResponseError.prototype.parseErrorByStatus = function (status) {
        switch (status) {
            case 401:
                this.code = Errors.NOT_AUTHORIZED;
                break;
            case 403:
                this.code = Errors.FORBIDDEN;
                break;
            case 404:
                this.code = Errors.NOT_FOUND;
                break;
            case 400:
                this.code = Errors.BAD_REQUEST;
                break;
            case 409:
                this.code = Errors.CONFLICTED;
                break;
            case 500:
                this.code = Errors.INTERNAL_ERROR;
                break;
            default:
                this.code = Errors.UNKNOWN;
        }
    };
    ResponseError.prototype.parseError = function () {
        var status = this._raw.status;
        var body = this._raw.body;
        if (utils_1.isEmpty(body)) {
            this.parseErrorByStatus(status);
        }
        else {
            this.parseErrorByBody(body);
        }
    };
    return ResponseError;
}(CommonError_1.CommonError));
exports.ResponseError = ResponseError;
//# sourceMappingURL=ResponseError.js.map