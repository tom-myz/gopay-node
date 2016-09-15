import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

/* Request */
export interface TransactionsHistoryListParams extends CRUDPaginationParams, AuthParams {}

/* Response */
export interface TransactionsHistoryItem {
    id: string
}

export type ResponseTransactionsHistory = TransactionsHistoryItem
export type ResponseTransactionsHistories = CRUDItemsResponse<TransactionsHistoryItem>

export class TransactionsHistory extends CRUDResource {

    public static routeBase: string = "(/stores/:storeId)/transaction_history"

    public get (storeId?: string,
                data?: TransactionsHistoryListParams,
                callback?: ResponseCallback<ResponseTransactionsHistories>): Promise<ResponseTransactionsHistories> {

        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

}
