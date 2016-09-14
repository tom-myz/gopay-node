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
    list(data?: StoresListParams, callback?: ResponseCallback<ResponseMerchants>): Promise<ResponseMerchants>;
    create(data: StoreCreateParams, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant>;
    get(id: string, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant>;
    update(id: string, data?: any, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant>;
    delete(id: string, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse>;
}
