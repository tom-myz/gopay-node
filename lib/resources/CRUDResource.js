"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WithAPI_1 = require("../api/WithAPI");
var validator_1 = require("../validation/validator");
var SDKError_1 = require("../errors/SDKError");
var error_codes_1 = require("../validation/error-codes");

var CRUDResource = function (_WithAPI_1$WithAPI) {
    _inherits(CRUDResource, _WithAPI_1$WithAPI);

    function CRUDResource(api) {
        _classCallCheck(this, CRUDResource);

        var _this = _possibleConstructorReturn(this, _WithAPI_1$WithAPI.call(this, api));

        var routeBase = _this.constructor.routeBase;
        _this._listRoute = _this.defineRoute("GET", routeBase);
        _this._createRoute = _this.defineRoute("POST", routeBase);
        _this._getRoute = _this.defineRoute("GET", routeBase + "/:id");
        _this._updateRoute = _this.defineRoute("PATCH", routeBase + "/:id");
        _this._deleteRoute = _this.defineRoute("DELETE", routeBase + "/:id");
        return _this;
    }

    CRUDResource.compilePath = function compilePath(path, pathParams) {
        return path.replace(/\((\w|:|\/)+\)/ig, function (o) {
            var part = o.replace(/:(\w+)/ig, function (s, p) {
                return pathParams[p] || s;
            });
            return part.indexOf(":") === -1 ? part.replace(/\(|\)/g, "") : "";
        }).replace(/:(\w+)/ig, function (s, p) {
            return pathParams[p] || s;
        });
    };

    CRUDResource.prototype.defineRoute = function defineRoute(method, path) {
        var api = this.api;
        return function route(pathParams, data, callback, options) {
            var url = CRUDResource.compilePath(path, pathParams);
            var schema = options.validationSchema || {};
            var validatorData = {};
            if (data instanceof FormData) {
                for (var _iterator = data.entries(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }

                    var pair = _ref;

                    validatorData[pair[0]] = pair[1];
                }
            } else {
                validatorData = data;
            }
            var validator = validator_1.DataValidator.create(validatorData, schema, error_codes_1.validationCodes);
            var cb = callback || function (err, result) {
                return null;
            };
            if (validator.fails()) {
                var errors = validator.errors.all();
                var err = SDKError_1.errorFromValidation(errors);
                cb(err, null);
                return Promise.reject(err);
            }
            function getBody() {
                if (data instanceof FormData) {
                    return data;
                } else if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object" && ["GET", "DELETE"].indexOf(method) === -1) {
                    return JSON.stringify(data);
                }
                return null;
            }
            function getUrl(_url) {
                var queryString = void 0;
                if (["GET", "DELETE"].indexOf(method) !== -1) {
                    queryString = Object.keys(data || {}).map(function (k) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
                    }).join("&");
                }
                return queryString ? _url + "?" + queryString : _url;
            }
            return api.send({ body: getBody(), method: method, url: getUrl(url) }, cb, options);
        };
    };

    return CRUDResource;
}(WithAPI_1.WithAPI);

exports.CRUDResource = CRUDResource;
//# sourceMappingURL=CRUDResource.js.map