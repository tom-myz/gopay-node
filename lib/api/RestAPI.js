"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("isomorphic-fetch");
var camelcase = require("camelcase");
var decamelize = require("decamelize");
var FormData = require("form-data");
var constants_1 = require("../constants");
var object_1 = require("../utils/object");

var RestAPI = function () {
    function RestAPI() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, RestAPI);

        this.endpoint = options.endpoint || constants_1.DEFAULT_ENDPOINT;
        this.appId = options.appId || process.env[constants_1.ENV_KEY_APP_ID];
        this.secret = options.secret || process.env[constants_1.ENV_KEY_SECRET];
        this.camel = options.camel || false;
    }

    RestAPI.requestParams = function requestParams(params) {
        return object_1.transformKeys(params, decamelize);
    };

    RestAPI.requestUrl = function requestUrl(url, data, isQueryString) {
        var queryString = void 0;
        if (isQueryString) {
            queryString = Object.keys(data || {}).map(function (k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join("&");
        }
        return queryString ? url + "?" + queryString : url;
    };

    RestAPI.requestBody = function requestBody(data, isQueryString) {
        if (!!data && data.constructor === FormData) {
            return data;
        } else if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object" && !isQueryString) {
            return JSON.stringify(data);
        }
        return null;
    };

    RestAPI.prototype.getBody = function getBody(data, payload) {
        return !payload ? JSON.stringify(data) : null;
    };

    RestAPI.prototype.getHeaders = function getHeaders(body) {
        var headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "ApplicationToken " + this.appId + "|" + (this.secret || ""));
        return headers;
    };

    RestAPI.prototype.send = function send(method, url, data, callback) {
        var _this = this;

        var payload = ["GET", "DELETE"].indexOf(method) !== -1;
        var body = this.getBody(data, payload);
        var headers = this.getHeaders(body);
        return new Promise(function (resolve, reject) {
            var request = new Request("" + _this.endpoint + RestAPI.requestUrl(url, data, payload), {
                body: body,
                headers: headers,
                method: method,
                mode: "cors"
            });
            fetch(request).then(function (response) {
                return Promise.all([Promise.resolve(response.status), response.text()]);
            }).then(function (_ref) {
                var status = _ref[0];
                var text = _ref[1];

                return Promise.all([Promise.resolve(status), Promise.resolve(text ? JSON.parse(text) : {})]);
            }).then(function (_ref2) {
                var status = _ref2[0];
                var body = _ref2[1];

                //const err: any = errorFromResponse(status, body)
                var err = null;
                if (err !== null) {
                    throw err;
                }
                var result = _this.camel ? object_1.transformKeys(body, camelcase) : body;
                callback(result);
                resolve(result);
            }).catch(function (error) {
                callback(error); // TODO: transform to error shape
                reject(error);
            });
        });
    };

    return RestAPI;
}();

exports.RestAPI = RestAPI;
//# sourceMappingURL=RestAPI.js.map