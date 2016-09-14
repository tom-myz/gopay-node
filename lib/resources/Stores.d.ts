import { ResponseCallback, ErrorResponse } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface StoresListParams extends CRUDPaginationParams {
}
export interface StoreCreateParams {
    name: string;
}
export interface StoreItem {
    id: string;
}
export declare type ResponseMerchant = StoreItem | ErrorResponse;
export declare type ResponseMerchants = CRUDItemsResponse<StoreItem> | ErrorResponse;
export declare class Stores extends CRUDResource {
    static routeBase: string;
    list<A>(data?: StoresListParams, callback?: ResponseCallback<ResponseMerchants>, _params?: A): Promise<ResponseMerchants>;
    create<A>(data: StoreCreateParams, callback?: ResponseCallback<ResponseMerchant>, _params?: A): Promise<ResponseMerchant>;
    get<A>(id: string, callback?: ResponseCallback<ResponseMerchant>, _params?: A): Promise<ResponseMerchant>;
    update<A>(id: string, data?: any, callback?: ResponseCallback<ResponseMerchant>, _params?: A): Promise<ResponseMerchant>;
    delete<A>(id: string, callback?: ResponseCallback<ErrorResponse>, _params?: A): Promise<ErrorResponse>;
}
