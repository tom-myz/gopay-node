import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export interface WebHookCommonParams {
}
export interface WebHookCreateParams extends WebHookCommonParams {
}
export interface WebHookUpdateParams extends WebHookCommonParams {
}
export declare class WebHooks extends CRUDResource {
    static routeBase: string;
    list(storeId: string, data: CRUDPaginationParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    create(storeId: string, data: WebHookCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    get(storeId: string, id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    update(storeId: string, id: string, data?: WebHookUpdateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    delete(storeId: string, id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
}
