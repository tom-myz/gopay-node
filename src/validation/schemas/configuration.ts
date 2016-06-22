import { getGatewayCredentialsSchema }  from "./gateway-credentials"

export function getConfigurationSchema (prefix: string = "") {
    return Object.assign({
        [`${prefix}domains`]            : "array",
        [`${prefix}debitEnabled`]       : "boolean",
        [`${prefix}prepaidEnabled`]     : "boolean",
        [`${prefix}paymentTypes`]       : "array",
    }, getGatewayCredentialsSchema(`${prefix}gatewayCredentials.`))
}
