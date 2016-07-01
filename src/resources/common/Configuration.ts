import { GatewayCredentialsParams } from "./GatewayCredentials"

export interface ConfigurationParams {
    debitEnabled?: boolean
    prepaidEnabled?: boolean
    gatewayCredentials?: GatewayCredentialsParams
}
