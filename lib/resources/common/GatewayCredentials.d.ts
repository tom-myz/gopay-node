export interface GatewayCredentials {
}
export interface PavisionCredentials extends GatewayCredentials {
    merchantId?: string;
    merchantGuid?: string;
}
export interface WorldpayCredentials extends GatewayCredentials {
    merchantId?: string;
    password?: string;
}
export interface GatewayCredentialsParams {
    [gateway: string]: GatewayCredentials;
}
