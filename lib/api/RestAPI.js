"use strict";
var popsicle_1 = require("popsicle");
var prefix = require("popsicle-resolve");
var utils_1 = require("../utils");
var RequestError_1 = require("../errors/RequestError");
var ResponseError_1 = require("../errors/ResponseError");
var ErrorsConstants_1 = require("../errors/ErrorsConstants");
(function (ResourceAccessType) {
    ResourceAccessType[ResourceAccessType["None"] = 0] = "None";
    ResourceAccessType[ResourceAccessType["AppId"] = 1] = "AppId";
    ResourceAccessType[ResourceAccessType["Secret"] = 4] = "Secret";
    ResourceAccessType[ResourceAccessType["Token"] = 8] = "Token";
    ResourceAccessType[ResourceAccessType["SecretOrToken"] = 12] = "SecretOrToken";
})(exports.ResourceAccessType || (exports.ResourceAccessType = {}));
var ResourceAccessType = exports.ResourceAccessType;
var RestAPI = (function () {
    function RestAPI(options) {
        this.endpoint = options.endpoint;
        this.appId = options.appId;
        this.secret = options.secret;
        this.token = options.token;
        this.camel = options.camel;
    }
    RestAPI.prototype.hasCredentials = function (accessType) {
        switch (accessType) {
            case ResourceAccessType.SecretOrToken:
                return !utils_1.isEmpty(this.token) || (!utils_1.isEmpty(this.appId) && !utils_1.isEmpty(this.secret));
            case ResourceAccessType.Token:
                return !utils_1.isEmpty(this.token);
            case ResourceAccessType.Secret:
                return !utils_1.isEmpty(this.appId) && !utils_1.isEmpty(this.secret);
            case ResourceAccessType.AppId:
                return !utils_1.isEmpty(this.appId);
            default:
                return true;
        }
    };
    RestAPI.prototype.getHeaders = function (accessType) {
        var authorization;
        switch (accessType) {
            case ResourceAccessType.SecretOrToken:
                if (this.hasCredentials(ResourceAccessType.Token)) {
                    authorization = "Token " + this.token;
                }
                else if (this.hasCredentials(ResourceAccessType.Secret)) {
                    authorization = "ApplicationToken " + this.appId + "|" + this.secret;
                }
                break;
            case ResourceAccessType.Token:
                authorization = "Token " + this.token;
                break;
            case ResourceAccessType.Secret:
                authorization = "ApplicationToken " + this.appId + "|" + this.secret;
                break;
            case ResourceAccessType.AppId:
                authorization = "ApplicationToken " + this.appId;
                break;
            default:
                authorization = undefined;
        }
        return Object.assign({
            "Accept": "application/json",
            "Content-Type": "application/json"
        }, !utils_1.isEmpty(authorization) ? { "Authorization": authorization } : {});
    };
    RestAPI.prototype.send = function (options, accessType) {
        var _this = this;
        if (accessType === void 0) { accessType = ResourceAccessType.None; }
        if (!this.hasCredentials(accessType)) {
            return Promise.reject(new RequestError_1.RequestError(ErrorsConstants_1.SDK_WRONG_CREDENTIALS));
        }
        var body = options.body ? utils_1.underscore(options.body) : undefined;
        return new Promise(function (resolve, reject) {
            popsicle_1.request(Object.assign({}, options, { body: body, headers: _this.getHeaders(accessType) }))
                .use(prefix(_this.endpoint))
                .then(function (response) {
                if (response.status >= 200 && response.status < 400) {
                    resolve(_this.camel ? utils_1.camelCase(response.body) : response.body);
                }
                else {
                    reject(new ResponseError_1.ResponseError(response));
                }
            })
                .catch(function () { return reject(new ResponseError_1.ResponseError()); });
        });
    };
    return RestAPI;
}());
exports.RestAPI = RestAPI;
//# sourceMappingURL=RestAPI.js.map