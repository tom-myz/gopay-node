"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("isomorphic-fetch");
var SDKError_1 = require("../errors/SDKError");
var utils_1 = require("../utils");
exports.DEFAULT_ENDPOINT = "http://localhost:9000";
exports.DEFAULT_ENV_APP_ID = "GPAY_APP_ID";
exports.DEFAULT_ENV_SECRET = "GPAY_SECRET";

var RestAPI = function () {
    function RestAPI(options) {
        _classCallCheck(this, RestAPI);

        this.endpoint = options.endpoint || exports.DEFAULT_ENDPOINT;
        this.appId = options.appId || process.env[exports.DEFAULT_ENV_APP_ID];
        this.secret = options.secret || process.env[exports.DEFAULT_ENV_SECRET];
        this.camel = options.camel || false;
    }

    RestAPI.requestParams = function requestParams(params) {
        return utils_1.underscore(params);
    };

    RestAPI.prototype.setToken = function setToken(token) {
        this.token = token;
    };

    RestAPI.prototype.getToken = function getToken() {
        return this.token;
    };

    RestAPI.prototype.send = function send(params, callback) {
        var _this = this;

        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        var _token = (options || {}).token || this.token;
        var headers = new Headers();
        if (_token) {
            headers.append("Authorization", "Token " + _token);
        } else if (Boolean(this.appId)) {
            headers.append("Authorization", "ApplicationToken " + this.appId + "|" + (this.secret || ""));
        }
        if (!(params.body instanceof FormData)) {
            headers.append("Content-Type", "application/json");
        } else if (params.body) {
            headers.append("Accept", "application/json");
        }
        return new Promise(function (resolve, reject) {
            var request = new Request("" + _this.endpoint + params.url, {
                body: params.body instanceof FormData ? utils_1.underscore(params.body) : params.body,
                headers: headers,
                method: params.method,
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

                var err = SDKError_1.errorFromResponse(status, body);
                if (err !== null) {
                    throw err;
                }
                var result = _this.camel ? utils_1.camelCase(body) : body;
                callback(null, result);
                resolve(result);
            }).catch(function (error) {
                callback(error, null);
                reject(error);
            });
        });
    };

    return RestAPI;
}();

exports.RestAPI = RestAPI;
//# sourceMappingURL=RestAPI.js.map