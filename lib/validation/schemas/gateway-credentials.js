"use strict";
function getGatewayCredentialsSchema(prefix = "") {
    return {
        [`${prefix}payvision.merchantId`]: "",
        [`${prefix}payvision.merchantGuid`]: "uuid",
        [`${prefix}worldpay.merchantId`]: "",
        [`${prefix}worldpay.password`]: ""
    };
}
exports.getGatewayCredentialsSchema = getGatewayCredentialsSchema;
//# sourceMappingURL=gateway-credentials.js.map