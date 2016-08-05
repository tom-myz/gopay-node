"use strict";
function credentialsCreateSchema(gateway) {
    return Object.assign({
        gateway: "required",
        currencies: "required|array",
        credentials: "object"
    });
}
exports.credentialsCreateSchema = credentialsCreateSchema;
function credentialsUpdateSchema(gateway) {
    return Object.assign({
        gateway: "string",
        currencies: "array",
        credentials: "object"
    });
}
exports.credentialsUpdateSchema = credentialsUpdateSchema;
//# sourceMappingURL=credentials.js.map