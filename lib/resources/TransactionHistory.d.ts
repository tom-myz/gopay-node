import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface TransactionHistoryListParams extends CRUDPaginationParams, AuthParams {
}
export interface TransactionHistoryItem {
    id: string;
}
export declare type ResponseTransactionHistory = TransactionHistoryItem;
export declare type ResponseTransactionHistories = CRUDItemsResponse<TransactionHistoryItem>;
export declare class TransactionHistory extends CRUDResource {
    static routeBase: string;
    list(storeId?: string, data?: TransactionHistoryListParams, callback?: ResponseCallback<ResponseTransactionHistories>): Promise<ResponseTransactionHistories>;
}
