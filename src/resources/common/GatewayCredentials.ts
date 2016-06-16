export interface GatewayCredentials {}

export interface PavisionCredentials extends GatewayCredentials {
    merchantId?: string
    merchantGuid?: string
}

export interface WorldpayCredentials extends GatewayCredentials {
    merchantId?: string
    password?: string
}

export interface GatewayCredentialsCommonParams {
    [gateway: string]: GatewayCredentials
}

export interface GatewayCredentialsCreateParams extends GatewayCredentialsCommonParams {}
export interface GatewayCredentialsUpdateParams extends GatewayCredentialsCommonParams {}