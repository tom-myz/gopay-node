"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PathParameterError_1 = require("../errors/PathParameterError");
var RequestParameterError_1 = require("../errors/RequestParameterError");
var parser_1 = require("../errors/parser");
var object_1 = require("../utils/object");

var Resource = function () {
    function Resource(api) {
        (0, _classCallCheck3.default)(this, Resource);

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

    Resource.prototype.defineRoute = function defineRoute(method, path) {
        var required = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

        var api = this.api;
        return function route(data, callback) {
            var pathParams = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

            for (var _len = arguments.length, params = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                params[_key - 3] = arguments[_key];
            }

            var _params = params.reduce(function (p, param, i) {
                if (pathParams && pathParams[i]) {
                    p[pathParams[i]] = param;
                }
                return p;
            }, {});
            var url = Resource.compilePath(path, _params);
            var missingPathParams = (url.match(/:([a-z]+)/ig) || []).map(function (m) {
                return m.replace(":", "");
            });
            var missingParams = object_1.missingKeys(data, required);
            if (missingPathParams.length > 0) {
                return Promise.reject(parser_1.fromError(new PathParameterError_1.PathParameterError(missingPathParams[0])));
            }
            if (missingParams.length > 0) {
                return Promise.reject(parser_1.fromError(new RequestParameterError_1.RequestParameterError(missingParams[0])));
            }
            return api.send(method, url, data, callback);
        };
    };

    return Resource;
}();

exports.Resource = Resource;
//# sourceMappingURL=Resource.js.map