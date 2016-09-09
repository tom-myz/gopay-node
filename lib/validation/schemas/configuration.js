"use strict";

var gateway_credentials_1 = require("./gateway-credentials");
function getConfigurationSchema() {
    var _Object$assign;

    var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

    return Object.assign((_Object$assign = {}, _Object$assign[prefix + "debitEnabled"] = "boolean", _Object$assign[prefix + "prepaidEnabled"] = "boolean", _Object$assign[prefix + "paymentTypes"] = "array", _Object$assign[prefix + "percentFee"] = "numeric", _Object$assign), gateway_credentials_1.getGatewayCredentialsSchema(prefix + "gatewayCredentials."));
}
exports.getConfigurationSchema = getConfigurationSchema;
//# sourceMappingURL=configuration.js.map
