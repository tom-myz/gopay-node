"use strict";

var camelcase = require("camelcase");
var APIError_1 = require("../errors/APIError");
var object_1 = require("./object");
function checkStatus(response) {
    if (response.status >= 200 && response.status < 400) {
        return Promise.resolve(response);
    }
    return parseJSON(response).then(function (json) {
        throw new APIError_1.APIError(response.status, json);
    });
}
exports.checkStatus = checkStatus;
function parseJSON(response) {
    return response.text().then(function (text) {
        return text ? object_1.transformKeys(JSON.parse(text), camelcase) : {};
    });
}
exports.parseJSON = parseJSON;
//# sourceMappingURL=fetch.js.map