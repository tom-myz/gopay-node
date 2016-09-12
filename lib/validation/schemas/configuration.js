"use strict";

function getConfigurationSchema() {
    var _ref;

    var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

    return _ref = {}, _ref[prefix + "debitEnabled"] = "boolean", _ref[prefix + "prepaidEnabled"] = "boolean", _ref[prefix + "paymentTypes"] = "array", _ref[prefix + "percentFee"] = "numeric", _ref[prefix + "flatFeeAmount"] = "numeric", _ref[prefix + "flatFeeCurrency"] = "string", _ref;
}
exports.getConfigurationSchema = getConfigurationSchema;
//# sourceMappingURL=configuration.js.map