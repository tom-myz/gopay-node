"use strict";
const prefix = require("superagent-prefix");
const SDKError_1 = require("../errors/SDKError");
const utils_1 = require("../utils");
exports.DEFAULT_ENDPOINT = "http://localhost:9000";
exports.DEFAULT_ENV_APP_ID = "GPAY_APP_ID";
exports.DEFAULT_ENV_SECRET = "GPAY_SECRET";
class RestAPI {
    constructor(options) {
        this.endpoint = options.endpoint || exports.DEFAULT_ENDPOINT;
        this.appId = options.appId || process.env[exports.DEFAULT_ENV_APP_ID];
        this.secret = options.secret || process.env[exports.DEFAULT_ENV_SECRET];
        this.camel = options.camel || false;
    }
    static requestParams(params) {
        return utils_1.underscore(params);
    }
    setToken(token) {
        this.token = token;
    }
    getToken() {
        return this.token;
    }
    send(request, callback, token) {
        const _token = token || this.token;
        let header;
        if (_token) {
            header = `Token ${_token}`;
        }
        else if (Boolean(this.appId)) {
            header = `ApplicationToken ${this.appId}|${this.secret || ""}`;
        }
        return new Promise((resolve, reject) => {
            request
                .use(prefix(this.endpoint))
                .accept("json")
                .type("json");
            if (header) {
                request.set("Authorization", header);
            }
            request.end((error, response) => {
                const err = SDKError_1.errorFromResponse(response);
                if (error || err !== null) {
                    callback(err, null);
                    reject(err);
                }
                else {
                    const result = this.camel ? utils_1.camelCase(response.body) : response.body;
                    callback(null, result);
                    resolve(result);
                }
            });
        });
    }
}
exports.RestAPI = RestAPI;
//# sourceMappingURL=RestAPI.js.map