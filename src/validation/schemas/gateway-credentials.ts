export function getGatewayCredentialsSchema (prefix: string = "") {
    return {
        [`${prefix}payvision.merchantId`]   : "string",
        [`${prefix}payvision.merchantGuid`] : "string",
        [`${prefix}worldpay.merchantId`]    : "string",
        [`${prefix}worldpay.password`]      : "string"
    }
}
