"use strict";
function getGatewayCredentialsSchema(prefix) {
    if (prefix === void 0) { prefix = ""; }
    return (_a = {},
        _a[prefix + "payvision.merchantId"] = "string",
        _a[prefix + "payvision.merchantGuid"] = "uuid",
        _a[prefix + "worldpay.merchantId"] = "string",
        _a[prefix + "worldpay.password"] = "string",
        _a
    );
    var _a;
}
exports.getGatewayCredentialsSchema = getGatewayCredentialsSchema;
//# sourceMappingURL=gateway-credentials.js.map