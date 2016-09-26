import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
import { ConfigurationCreateParams, ConfigurationUpdateParams, ConfigurationItem } from "./common/Configuration";
export interface StoresListParams extends CRUDPaginationParams, AuthParams {
    search?: string;
}
export interface StoreCreateParams extends AuthParams {
    name: string;
    configuration?: ConfigurationCreateParams;
}
export interface StoreUpdateParams extends AuthParams {
    name?: string;
    configuration?: ConfigurationUpdateParams;
}
export interface StoreItem {
    id: string;
    merchantId: string;
    name: string;
    active: boolean;
    createdOn: number;
    updatedOn: number;
    configuration: ConfigurationItem;
}
export declare type ResponseStore = StoreItem;
export declare type ResponseStores = CRUDItemsResponse<StoreItem>;
export declare class Stores extends CRUDResource {
    static requiredParams: Array<string>;
    static routeBase: string;
    list(data?: StoresListParams, callback?: ResponseCallback<ResponseStores>): Promise<ResponseStores>;
    create(data: StoreCreateParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore>;
    get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore>;
    update(id: string, data?: StoreUpdateParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore>;
    delete(id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse>;
}
