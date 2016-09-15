import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface StoresListParams extends CRUDPaginationParams, AuthParams {
}
export interface StoreCreateParams extends AuthParams {
    name: string;
}
export interface StoreUpdateParams extends AuthParams {
    name: string;
}
export interface StoreItem {
    id: string;
}
export declare type ResponseStore = StoreItem;
export declare type ResponseStores = CRUDItemsResponse<StoreItem>;
export declare class Stores extends CRUDResource {
    static routeBase: string;
    list(data?: StoresListParams, callback?: ResponseCallback<ResponseStores>): Promise<ResponseStores>;
    create(data: StoreCreateParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore>;
    get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore>;
    update(id: string, data?: StoreUpdateParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore>;
    delete(id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse>;
}
