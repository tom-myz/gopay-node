"use strict";
const gateway_credentials_1 = require("./gateway-credentials");
function getConfigurationSchema(prefix = "") {
    return Object.assign({
        [`${prefix}domains`]: "array",
        [`${prefix}debitEnabled`]: "boolean",
        [`${prefix}prepaidEnabled`]: "boolean",
        [`${prefix}paymentTypes`]: "array",
    }, gateway_credentials_1.getGatewayCredentialsSchema(`${prefix}gatewayCredentials.`));
}
exports.getConfigurationSchema = getConfigurationSchema;
//# sourceMappingURL=configuration.js.map