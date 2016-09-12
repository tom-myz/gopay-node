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
    var prefix = "credentials.";
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
function credentialsPayvision() {
    var _ref;

    var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var required = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var requiredRule = required ? "required|" : "";
    return _ref = {}, _ref[prefix + "merchantId"] = requiredRule + "string", _ref[prefix + "merchantGuid"] = requiredRule + "uuid", _ref;
}
exports.credentialsPayvision = credentialsPayvision;
function credentialsWorldpay() {
    var _ref2;

    var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var required = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var requiredRule = required ? "required|" : "";
    return _ref2 = {}, _ref2[prefix + "merchantId"] = requiredRule + "string", _ref2[prefix + "password"] = requiredRule + "string", _ref2;
}
exports.credentialsWorldpay = credentialsWorldpay;
function credentialsWirecard() {
    var _ref3;

    var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var required = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var requiredRule = required ? "required|" : "";
    return _ref3 = {}, _ref3[prefix + "businessCase"] = requiredRule + "string", _ref3[prefix + "username"] = requiredRule + "string", _ref3[prefix + "password"] = requiredRule + "string", _ref3[prefix + "cardBrands"] = requiredRule + "array", _ref3;
}
exports.credentialsWirecard = credentialsWirecard;
function credentialsAlliedWallet() {
    var _ref4;

    var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var required = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var requiredRule = required ? "required|" : "";
    return _ref4 = {}, _ref4[prefix + "merchantId"] = requiredRule + "uuid", _ref4[prefix + "siteId"] = requiredRule + "uuid", _ref4;
}
exports.credentialsAlliedWallet = credentialsAlliedWallet;
//# sourceMappingURL=credentials.js.map