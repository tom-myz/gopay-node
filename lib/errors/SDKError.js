"use strict";
var Code = require("./ErrorsConstants");
var SDKErrorDefaults = {
    type: "request",
    status: 0,
    code: Code.UNKNOWN,
    errors: []
};
function getCodeByStatus(status) {
    var codeMap = {
        400: Code.BAD_REQUEST,
        401: Code.NOT_AUTHORIZED,
        403: Code.FORBIDDEN,
        404: Code.NOT_FOUND,
        405: Code.NOT_ALLOWED,
        409: Code.CONFLICTED,
        429: Code.TOO_MANY_REQUESTS,
        500: Code.INTERNAL_ERROR,
        503: Code.SERVICE_UNAVAILABLE
    };
    if (Object.keys(codeMap).indexOf(status.toString()) !== -1) {
        return codeMap[status];
    }
    return Code.UNKNOWN;
}
function errorUnknown(type) {
    return Object.assign(SDKErrorDefaults, { type: type });
}
exports.errorUnknown = errorUnknown;
function errorFromResponse(response) {
    if (!response) {
        return errorUnknown("response");
    }
    var status = response.status;
    var body = response.body;
    if (status >= 200 && status < 400) {
        return null;
    }
    if (body) {
        return Object.assign({}, SDKErrorDefaults, {
            type: "response",
            code: body.code,
            errors: body.errors,
            status: status
        });
    }
    return Object.assign({}, SDKErrorDefaults, {
        type: "response",
        code: getCodeByStatus(status),
        errors: [],
        status: status
    });
}
exports.errorFromResponse = errorFromResponse;
function errorFromValidation(errors) {
    return Object.assign({}, SDKErrorDefaults, {
        code: Code.VALIDATION_ERROR,
        errors: Object.keys(errors).reduce(function (r, field) {
            var codes = errors[field];
            r.push({ field: field, reason: codes[0] });
            return r;
        }, [])
    });
}
exports.errorFromValidation = errorFromValidation;
//# sourceMappingURL=SDKError.js.map