import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface WebHooksListParams extends CRUDPaginationParams, AuthParams {
}
export interface WebHookCreateParams extends AuthParams {
}
export interface WebHookUpdateParams extends AuthParams {
}
export interface WebHookItem {
    id: string;
}
export declare type ResponseWebHook = WebHookItem;
export declare type ResponseWebHooks = CRUDItemsResponse<WebHookItem>;
export declare class WebHooks extends CRUDResource {
    static routeBase: string;
    list(storeId: string, data?: WebHooksListParams, callback?: ResponseCallback<ResponseWebHooks>): Promise<ResponseWebHooks>;
    create(storeId: string, data: WebHookCreateParams, callback?: ResponseCallback<ResponseWebHook>): Promise<ResponseWebHook>;
    get(storeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ResponseWebHook>): Promise<ResponseWebHook>;
    update(storeId: string, id: string, data?: WebHookUpdateParams, callback?: ResponseCallback<ResponseWebHook>): Promise<ResponseWebHook>;
    delete(storeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse>;
}
