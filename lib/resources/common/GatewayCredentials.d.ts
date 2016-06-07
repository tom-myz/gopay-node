import { ValidationSchema } from "../../validation/Validation";
export interface IGatewayCredentials {
}
export interface PavisionCredentials extends IGatewayCredentials {
    merchantId?: string;
    merchantGuid?: string;
}
export interface WorldpayCredentials extends IGatewayCredentials {
    merchantId?: string;
    password?: string;
}
export interface PGatewayCredentials {
    [gateway: string]: IGatewayCredentials;
}
export declare const payvisionSchema: ValidationSchema;
export declare const worldpaySchema: ValidationSchema;
export declare const gatewayCredentialsSchema: ValidationSchema;
