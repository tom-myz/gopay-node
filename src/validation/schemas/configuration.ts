import { getGatewayCredentialsSchema }  from "./gateway-credentials"

export function getConfigurationSchema (prefix: string = "") {
    return Object.assign({
        [`${prefix}debitEnabled`]   : "boolean",
        [`${prefix}prepaidEnabled`] : "boolean",
        [`${prefix}paymentTypes`]   : "array",
        [`${prefix}percentFee`]     : "numeric",
    }, getGatewayCredentialsSchema(`${prefix}gatewayCredentials.`))
}
