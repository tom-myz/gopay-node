"use strict";
var prefix = require("superagent-prefix");
var SDKError_1 = require("../errors/SDKError");
var utils_1 = require("../utils");
exports.DEFAULT_ENDPOINT = "http://localhost:9000";
exports.DEFAULT_ENV_APP_ID = "GPAY_APP_ID";
exports.DEFAULT_ENV_SECRET = "GPAY_SECRET";
var RestAPI = (function () {
    function RestAPI(options) {
        this.endpoint = options.endpoint || exports.DEFAULT_ENDPOINT;
        this.appId = options.appId || process.env[exports.DEFAULT_ENV_APP_ID];
        this.secret = options.secret || process.env[exports.DEFAULT_ENV_SECRET];
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
        var header;
        if (_token) {
            header = "Token " + _token;
        }
        else if (Boolean(this.appId)) {
            header = "ApplicationToken " + this.appId + "|" + (this.secret || "");
        }
        return new Promise(function (resolve, reject) {
            request
                .use(prefix(_this.endpoint))
                .accept("json")
                .type("json");
            if (header) {
                request.set("Authorization", header);
            }
            request.end(function (error, response) {
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