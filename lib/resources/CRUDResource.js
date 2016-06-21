"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var superagent = require("superagent");
var WithAPI_1 = require("../api/WithAPI");
var validator_1 = require("../validation/validator");
var SDKError_1 = require("../errors/SDKError");
var error_codes_1 = require("../validation/error-codes");
var methodsMap = {
    "GET": "get",
    "POST": "post",
    "PUT": "put",
    "PATCH": "patch",
    "DELETE": "del"
};
var CRUDResource = (function (_super) {
    __extends(CRUDResource, _super);
    function CRUDResource(api) {
        _super.call(this, api);
        var routeBase = this.constructor.routeBase;
        this._listRoute = this.defineRoute("GET", routeBase);
        this._createRoute = this.defineRoute("POST", routeBase);
        this._getRoute = this.defineRoute("GET", routeBase + "/:id");
        this._updateRoute = this.defineRoute("PATCH", routeBase + "/:id");
        this._deleteRoute = this.defineRoute("DELETE", routeBase + "/:id");
    }
    CRUDResource.compilePath = function (path, pathParams) {
        return path
            .replace(/\((\w|:|\/)+\)/ig, function (o) {
            var part = o.replace(/:(\w+)/ig, function (s, p) {
                return pathParams[p] || s;
            });
            return part.indexOf(":") === -1 ? part.replace(/\(|\)/g, "") : "";
        })
            .replace(/:(\w+)/ig, function (s, p) { return pathParams[p] || s; });
    };
    CRUDResource.prototype.defineRoute = function (method, path) {
        var api = this.api;
        var defaultOptions = {};
        return function route(pathParams, data, callback, options) {
            if (options === void 0) { options = defaultOptions; }
            var url = CRUDResource.compilePath(path, pathParams);
            var req = superagent[methodsMap[method]](url);
            var schema = options.validationSchema || {};
            var validator = validator_1.DataValidator.create(data || {}, schema, error_codes_1.validationCodes);
            var cb = callback || (function (err, result) { return null; });
            if (validator.fails()) {
                var errors = validator.errors.all();
                var err = SDKError_1.errorFromValidation(errors);
                cb(err, null);
                return Promise.reject(err);
            }
            return api.send(["GET", "DELETE"].indexOf(method) !== -1 ? req.query(data) : req.send(data), cb, options.token);
        };
    };
    return CRUDResource;
}(WithAPI_1.WithAPI));
exports.CRUDResource = CRUDResource;
//# sourceMappingURL=CRUDResource.js.map