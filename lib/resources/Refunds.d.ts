import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface RefundsListParams extends CRUDPaginationParams, AuthParams {
}
export interface RefundCreateParams extends AuthParams {
}
export interface RefundItem {
    id: string;
}
export declare type ResponseRefund = RefundItem;
export declare type ResponseRefunds = CRUDItemsResponse<RefundItem>;
export declare class Refunds extends CRUDResource {
    static routeBase: string;
    list(storeId: string, chargeId: string, data?: RefundsListParams, callback?: ResponseCallback<ResponseRefunds>): Promise<ResponseRefunds>;
    create(storeId: string, chargeId: string, data: RefundCreateParams, callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund>;
    get(storeId: string, chargeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund>;
}
