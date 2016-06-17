"use strict";
var prefix = require("superagent-prefix");
var SDKError_1 = require("../errors/SDKError");
var utils_1 = require("../utils");
var DEFAULT_ENDPOINT = "http://localhost:9000";
var DEFAULT_ENV_APP_ID = "";
var DEFAULT_ENV_SECRET = "";
var RestAPI = (function () {
    function RestAPI(options) {
        this.endpoint = options.endpoint || DEFAULT_ENDPOINT;
        this.appId = options.appId || process.env[DEFAULT_ENV_APP_ID];
        this.secret = options.secret || process.env[DEFAULT_ENV_SECRET];
        this.camel = options.camel || false;
    }
    RestAPI.requestParams = function (params) {
        return utils_1.underscore(params);
    };
    RestAPI.prototype.setToken = function (token) {
        this.token = token;
    };
    RestAPI.prototype.send = function (request, callback, token) {
        var _this = this;
        var _token = token || this.token;
        return new Promise(function (resolve, reject) {
            request
                .use(prefix(_this.endpoint))
                .accept("json")
                .type("json")
                .set("Authorization", _token ? "Token " + _token : _this.appId + "|" + _this.secret)
                .end(function (error, response) {
                var err = SDKError_1.errorFromResponse(response);
                if (error || err !== null) {
                    callback(err, null);
                    reject(err);
                }
                else {
                    var result = _this.camel ? utils_1.camelCase(response.body) : response.body;
                    callback(null, result);
                    resolve(result);
                }
            });
        });
    };
    return RestAPI;
}());
exports.RestAPI = RestAPI;
//# sourceMappingURL=RestAPI.js.map