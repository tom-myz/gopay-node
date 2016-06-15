"use strict";
var _ = require("lodash");
var SDKErrorDefaults = {
    type: "request",
    status: 0,
    code: "UNKNOWN",
    message: "Unknown error occurred",
    params: []
};
function errorUnknown(type) {
    return _.assign(SDKErrorDefaults, { type: type });
}
exports.errorUnknown = errorUnknown;
function errorFromResponse(response) {
    var status = response.status, body = response.body;
    if (status >= 200 && status < 400) {
        return null;
    }
    console.warn(status, body);
    if (body) {
    }
    return SDKErrorDefaults;
}
exports.errorFromResponse = errorFromResponse;
//# sourceMappingURL=SDKError.js.map