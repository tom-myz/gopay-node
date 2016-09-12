"use strict";

function getGatewayCredentialsSchema() {
    var _ref;

    var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

    return _ref = {}, _ref[prefix + "payvision.merchantId"] = "", _ref[prefix + "payvision.merchantGuid"] = "uuid", _ref[prefix + "worldpay.merchantId"] = "", _ref[prefix + "worldpay.password"] = "", _ref;
}
exports.getGatewayCredentialsSchema = getGatewayCredentialsSchema;
//# sourceMappingURL=gateway-credentials.js.map
//# sourceMappingURL=gateway-credentials.js.map