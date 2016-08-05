import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export interface CredentialsCommonParams {
    gateway?: string;
    credentials?: any;
    currencies?: Array<string>;
}
export interface CredentialsCreateParams extends CredentialsCommonParams {
    gateway: string;
    credentials: any;
    currencies: Array<string>;
}
export interface CredentialsUpdateParams extends CredentialsCommonParams {
}
export declare class Credentials extends CRUDResource {
    static routeBase: string;
    list(callback?: SDKCallbackFunction, data?: CRUDPaginationParams, merchantId?: string, token?: string): Promise<any>;
    create(data: CredentialsCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    get(id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    update(id: string, data?: CredentialsUpdateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    delete(id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
}
