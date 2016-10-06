import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
import { PaymentError } from "./common/PaymentError";
export interface RefundsListParams extends CRUDPaginationParams, AuthParams {
}
export interface RefundCreateParams extends AuthParams {
    amount: number;
    currency: string;
    reason?: string;
    message?: string;
    metadata?: any;
}
export interface RefundItem {
    id: string;
    chargeId: string;
    ledgerId?: string;
    status: string;
    amount: number;
    currency: string;
    reason?: string;
    message?: string;
    error?: PaymentError;
    metadata?: any;
    testMode: boolean;
    createdOn: number;
    updatedOn: number;
}
export declare type ResponseRefund = RefundItem;
export declare type ResponseRefunds = CRUDItemsResponse<RefundItem>;
export declare class Refunds extends CRUDResource {
    static requiredParams: Array<string>;
    static routeBase: string;
    list(storeId: string, chargeId: string, data?: RefundsListParams, callback?: ResponseCallback<ResponseRefunds>): Promise<ResponseRefunds>;
    create(storeId: string, chargeId: string, data: RefundCreateParams, callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund>;
    get(storeId: string, chargeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund>;
}
