export function getGatewayCredentialsSchema (prefix: string = "") {
    return {
        [`${prefix}payvision.merchantId`]   : "",
        [`${prefix}payvision.merchantGuid`] : "uuid",
        [`${prefix}worldpay.merchantId`]    : "",
        [`${prefix}worldpay.password`]      : ""
    }
}
