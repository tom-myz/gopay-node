import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
import { ConfigurationParams } from "./common/Configuration";
export interface StoreCommonParams {
    name?: string;
    configuration?: ConfigurationParams;
}
export interface StoreCreateParams extends StoreCommonParams {
    name: string;
}
export interface StoreUpdateParams extends StoreCommonParams {
}
export declare class Stores extends CRUDResource {
    static routeBase: string;
    list(data: CRUDPaginationParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    create(data: StoreCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    get(id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    update(id: string, data?: StoreUpdateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
}
