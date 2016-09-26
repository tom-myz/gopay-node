import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface TransactionsHistoryListParams extends CRUDPaginationParams, AuthParams {
    from?: number | string;
    to?: number | string;
    status?: string;
    type?: string;
}
export interface TransactionsHistoryItem {
    resourceId: string;
    merchantId: string;
    storeId: string;
    chargeId?: string;
    amount: number;
    currency: string;
    transactionType: string;
    createdOn: number;
}
export declare type ResponseTransactionsHistories = CRUDItemsResponse<TransactionsHistoryItem>;
export declare class TransactionsHistory extends CRUDResource {
    static routeBase: string;
    get(storeId?: string, data?: TransactionsHistoryListParams, callback?: ResponseCallback<ResponseTransactionsHistories>): Promise<ResponseTransactionsHistories>;
}
