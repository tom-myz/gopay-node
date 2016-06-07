"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WithAPI_1 = require("../api/WithAPI");
var RestAPI_1 = require("../api/RestAPI");
var Validation_1 = require("../validation/Validation");
var Errors_1 = require("../errors/Errors");
var CRUDResource = (function (_super) {
    __extends(CRUDResource, _super);
    function CRUDResource() {
        _super.apply(this, arguments);
        this.urlSegment = "";
        this.accessType = RestAPI_1.ResourceAccessType.None;
    }
    CRUDResource.prototype.url = function (segments) {
        return "/" + this.urlSegment + (segments.id ? "/" + segments.id : "");
    };
    CRUDResource.prototype._create = function (options, accessType) {
        var _this = this;
        if (accessType === void 0) { accessType = this.accessType; }
        var fn = this.schemaCreate || (function () { return undefined; });
        var schema = Object.assign({}, fn(options.data));
        return this.validate(options.data, schema)
            .then(function () { return _this.api.send({
            body: options.data,
            method: "POST",
            url: _this.url(options)
        }, accessType); });
    };
    CRUDResource.prototype._read = function (options, accessType) {
        if (accessType === void 0) { accessType = this.accessType; }
        return this.api.send({
            method: "GET",
            url: this.url(options)
        }, accessType);
    };
    CRUDResource.prototype._update = function (options, accessType) {
        var _this = this;
        if (accessType === void 0) { accessType = this.accessType; }
        var fn = this.schemaUpdate || (function () { return undefined; });
        var schema = Object.assign({}, fn(options.data));
        return this.validate(options.data, schema)
            .then(function () { return _this.api.send({
            body: options.data,
            method: "PATCH",
            url: _this.url(options)
        }, accessType); });
    };
    CRUDResource.prototype._delete = function (options, accessType) {
        if (accessType === void 0) { accessType = this.accessType; }
        return this.api.send({
            method: "DELETE",
            url: this.url(options)
        }, accessType);
    };
    CRUDResource.prototype.validate = function (data, schema) {
        if (data === void 0) { data = {}; }
        var errors = Validation_1.Validation.validate(data, schema);
        if (errors.length === 0) {
            return Promise.resolve(data);
        }
        return Promise.reject(Errors_1.VALIDATION_ERROR(errors));
    };
    return CRUDResource;
}(WithAPI_1.WithAPI));
exports.CRUDResource = CRUDResource;
//# sourceMappingURL=CRUDResource.js.map