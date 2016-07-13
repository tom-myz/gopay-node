"use strict";
const superagent = require("superagent");
const WithAPI_1 = require("../api/WithAPI");
const validator_1 = require("../validation/validator");
const SDKError_1 = require("../errors/SDKError");
const error_codes_1 = require("../validation/error-codes");
const underscore_1 = require("../utils/underscore");
const methodsMap = {
    "GET": "get",
    "POST": "post",
    "PUT": "put",
    "PATCH": "patch",
    "DELETE": "del"
};
class CRUDResource extends WithAPI_1.WithAPI {
    constructor(api) {
        super(api);
        const routeBase = this.constructor.routeBase;
        this._listRoute = this.defineRoute("GET", routeBase);
        this._createRoute = this.defineRoute("POST", routeBase);
        this._getRoute = this.defineRoute("GET", `${routeBase}/:id`);
        this._updateRoute = this.defineRoute("PATCH", `${routeBase}/:id`);
        this._deleteRoute = this.defineRoute("DELETE", `${routeBase}/:id`);
    }
    static compilePath(path, pathParams) {
        return path
            .replace(/\((\w|:|\/)+\)/ig, (o) => {
            const part = o.replace(/:(\w+)/ig, (s, p) => {
                return pathParams[p] || s;
            });
            return part.indexOf(":") === -1 ? part.replace(/\(|\)/g, "") : "";
        })
            .replace(/:(\w+)/ig, (s, p) => pathParams[p] || s);
    }
    defineRoute(method, path) {
        const api = this.api;
        const defaultOptions = {};
        return function route(pathParams, data, callback, options = defaultOptions) {
            const url = CRUDResource.compilePath(path, pathParams);
            const req = superagent[methodsMap[method]](url);
            const schema = options.validationSchema || {};
            const validator = validator_1.DataValidator.create(data || {}, schema, error_codes_1.validationCodes);
            const cb = callback || ((err, result) => null);
            if (validator.fails()) {
                const errors = validator.errors.all();
                const err = SDKError_1.errorFromValidation(errors);
                cb(err, null);
                return Promise.reject(err);
            }
            const apiData = underscore_1.underscore(data);
            return api.send(["GET", "DELETE"].indexOf(method) !== -1 ? req.query(apiData) : req.send(apiData), cb, options.token);
        };
    }
}
exports.CRUDResource = CRUDResource;
//# sourceMappingURL=CRUDResource.js.map