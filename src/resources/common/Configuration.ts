import { GatewayCredentialsParams } from "./GatewayCredentials"

export interface ConfigurationParams {
    domains?: Array<string>
    debitEnabled?: boolean
    prepaidEnabled?: boolean
    gatewayCredentials?: GatewayCredentialsParams
}
