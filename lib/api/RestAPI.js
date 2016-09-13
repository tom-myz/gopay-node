"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("isomorphic-fetch");
var camelcase = require("camelcase");
var decamelize = require("decamelize");
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
                body: params.body,
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

                //const err: any = errorFromResponse(status, body)
                var err = null;
                if (err !== null) {
                    throw err;
                }
                var result = _this.camel ? object_1.transformKeys(body, camelcase) : body;
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