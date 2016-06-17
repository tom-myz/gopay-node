"use strict";
var gateway_credentials_1 = require("./gateway-credentials");
function getConfigurationSchema(prefix) {
    if (prefix === void 0) { prefix = ""; }
    return Object.assign((_a = {},
        _a[prefix + "domains"] = "array",
        _a[prefix + "debitEnabled"] = "boolean",
        _a[prefix + "prepaidEnabled"] = "boolean",
        _a[prefix + "paymentTypes"] = "array",
        _a
    ), gateway_credentials_1.getGatewayCredentialsSchema(prefix + "gatewayCredentials."));
    var _a;
}
exports.getConfigurationSchema = getConfigurationSchema;
//# sourceMappingURL=configuration.js.map