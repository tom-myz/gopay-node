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
var Validator_1 = require("../validation/validators/Validator");
var paginationSchema = {
    page: [new Validator_1.default.Numeric()],
    pageSize: [new Validator_1.default.Numeric()]
};
var ListResource = (function (_super) {
    __extends(ListResource, _super);
    function ListResource() {
        _super.apply(this, arguments);
        this.urlSegment = "";
        this.accessType = RestAPI_1.ResourceAccessType.None;
    }
    ListResource.prototype.url = function (segments) {
        return "/" + this.urlSegment;
    };
    ListResource.prototype._read = function (options, accessType) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (accessType === void 0) { accessType = this.accessType; }
        var fn = this.schemaParams || (function () { return undefined; });
        var schema = Object.assign({}, paginationSchema, fn(options.data));
        return this.validate(options.data, schema)
            .then(function () { return _this.api.send({
            method: "GET",
            query: options.data,
            url: _this.url(options)
        }, accessType); });
    };
    ListResource.prototype.validate = function (data, schema) {
        if (data === void 0) { data = {}; }
        var errors = Validation_1.Validation.validate(data, schema);
        if (errors.length === 0) {
            return Promise.resolve(data);
        }
        return Promise.reject(Errors_1.VALIDATION_ERROR(errors));
    };
    return ListResource;
}(WithAPI_1.WithAPI));
exports.ListResource = ListResource;
//# sourceMappingURL=ListResource.js.map