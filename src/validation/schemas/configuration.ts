export function getConfigurationSchema (prefix: string = "") {
    return {
        [`${prefix}debitEnabled`]    : "boolean",
        [`${prefix}prepaidEnabled`]  : "boolean",
        [`${prefix}paymentTypes`]    : "array",
        [`${prefix}percentFee`]      : "numeric",
        [`${prefix}flatFeeAmount`]   : "numeric",
        [`${prefix}flatFeeCurrency`] : "string"
    }
}
