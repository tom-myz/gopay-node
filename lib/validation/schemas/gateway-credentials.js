"use strict";
function getGatewayCredentialsSchema(prefix = "") {
    return {
        [`${prefix}payvision.merchantId`]: "string",
        [`${prefix}payvision.merchantGuid`]: "uuid",
        [`${prefix}worldpay.merchantId`]: "string",
        [`${prefix}worldpay.password`]: "string"
    };
}
exports.getGatewayCredentialsSchema = getGatewayCredentialsSchema;
//# sourceMappingURL=gateway-credentials.js.map