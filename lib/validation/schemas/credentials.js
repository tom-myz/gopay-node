"use strict";
function credentialsCreateSchema(gateway) {
    return Object.assign({
        gateway: "required",
        currencies: "required|array",
        credentials: "object"
    }, getCredendials(gateway, true));
}
exports.credentialsCreateSchema = credentialsCreateSchema;
function credentialsUpdateSchema(gateway) {
    return Object.assign({
        gateway: "string",
        currencies: "array",
        credentials: "object"
    }, getCredendials(gateway, false));
}
exports.credentialsUpdateSchema = credentialsUpdateSchema;
function getCredendials(gateway, required) {
    const prefix = "credentials.";
    switch (gateway) {
        case "payvision":
            return credentialsPayvision(prefix, required);
        case "world_pay":
            return credentialsWorldpay(prefix, required);
        case "wirecard":
            return credentialsWirecard(prefix, required);
        case "allied_wallet":
            return credentialsAlliedWallet(prefix, required);
    }
}
function credentialsPayvision(prefix = "", required = false) {
    const requiredRule = required ? "required|" : "";
    return {
        [`${prefix}merchantId`]: `${requiredRule}string`,
        [`${prefix}merchantGuid`]: `${requiredRule}uuid`
    };
}
exports.credentialsPayvision = credentialsPayvision;
function credentialsWorldpay(prefix = "", required = false) {
    const requiredRule = required ? "required|" : "";
    return {
        [`${prefix}merchantId`]: `${requiredRule}string`,
        [`${prefix}password`]: `${requiredRule}string`
    };
}
exports.credentialsWorldpay = credentialsWorldpay;
function credentialsWirecard(prefix = "", required = false) {
    const requiredRule = required ? "required|" : "";
    return {
        [`${prefix}businessCase`]: `${requiredRule}string`,
        [`${prefix}username`]: `${requiredRule}string`,
        [`${prefix}password`]: `${requiredRule}string`,
        [`${prefix}cardBrands`]: `${requiredRule}array`
    };
}
exports.credentialsWirecard = credentialsWirecard;
function credentialsAlliedWallet(prefix = "", required = false) {
    const requiredRule = required ? "required|" : "";
    return {
        [`${prefix}merchantId`]: `${requiredRule}uuid`,
        [`${prefix}siteId`]: `${requiredRule}uuid`
    };
}
exports.credentialsAlliedWallet = credentialsAlliedWallet;
//# sourceMappingURL=credentials.js.map