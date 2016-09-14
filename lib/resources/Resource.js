"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormData = require("form-data");
var PathParameterError_1 = require("../errors/PathParameterError");
var object_1 = require("../utils/object");

var Resource = function () {
    function Resource(api) {
        _classCallCheck(this, Resource);

        this.api = api;
    }

    Resource.compilePath = function compilePath(path, pathParams) {
        return path.replace(/\((\w|:|\/)+\)/ig, function (o) {
            var part = o.replace(/:(\w+)/ig, function (s, p) {
                return pathParams[p] || s;
            });
            return part.indexOf(":") === -1 ? part.replace(/\(|\)/g, "") : "";
        }).replace(/:(\w+)/ig, function (s, p) {
            return pathParams[p] || s;
        });
    };

    Resource.prototype.defineRoute = function defineRoute(method, path, pathParams, required) {
        var api = this.api;
        return function route(params, data, callback) {
            var url = Resource.compilePath(path, params);
            var missingPathParams = (url.match(/:([a-z]+)/ig) || []).map(function (m) {
                return m.replace(":", "");
            });
            if (missingPathParams.length > 0) {
                Promise.reject(new PathParameterError_1.PathParameterError(missingPathParams[0]));
            }
            if (!(!!data && data.constructor === FormData) && (typeof data === "undefined" ? "undefined" : _typeof(data)) === "object") {
                var missingParams = object_1.missingKeys(data, required);
                if (missingParams.length > 0) {
                    Promise.reject(new PathParameterError_1.PathParameterError(missingParams[0]));
                }
            }
            return api.send(method, url, data, callback);
        };
    };

    return Resource;
}();

exports.Resource = Resource;
//# sourceMappingURL=Resource.js.map