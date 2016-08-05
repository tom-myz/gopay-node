"use strict";
function getConfigurationSchema(prefix = "") {
    return {
        [`${prefix}debitEnabled`]: "boolean",
        [`${prefix}prepaidEnabled`]: "boolean",
        [`${prefix}paymentTypes`]: "array",
        [`${prefix}percentFee`]: "numeric",
        [`${prefix}flatFeeAmount`]: "numeric",
        [`${prefix}flatFeeCurrency`]: "string"
    };
}
exports.getConfigurationSchema = getConfigurationSchema;
//# sourceMappingURL=configuration.js.map