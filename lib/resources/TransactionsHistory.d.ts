import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface TransactionsHistoryListParams extends CRUDPaginationParams, AuthParams {
}
export interface TransactionsHistoryItem {
    id: string;
}
export declare type ResponseTransactionsHistory = TransactionsHistoryItem;
export declare type ResponseTransactionsHistories = CRUDItemsResponse<TransactionsHistoryItem>;
export declare class TransactionsHistory extends CRUDResource {
    static routeBase: string;
    get(storeId?: string, data?: TransactionsHistoryListParams, callback?: ResponseCallback<ResponseTransactionsHistories>): Promise<ResponseTransactionsHistories>;
}
