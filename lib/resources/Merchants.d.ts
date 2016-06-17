import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
import { ContactInfoParams } from "./common/ContactInfo";
import { ConfigurationParams } from "./common/Configuration";
export interface MerchantCommonParams {
    email?: string;
    address?: ContactInfoParams;
    configuration?: ConfigurationParams;
}
export interface MerchantCreateParams extends MerchantCommonParams {
    email: string;
    password: string;
}
export interface MerchantUpdateParams extends MerchantCommonParams {
}
export declare class Merchants extends CRUDResource {
    static routeBase: string;
    list(data: CRUDPaginationParams, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    create(data: MerchantCreateParams, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    get(id: string, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    update(id: string, data?: MerchantUpdateParams, callback?: SDKCallbackFunction, token?: string): Promise<any>;
}
