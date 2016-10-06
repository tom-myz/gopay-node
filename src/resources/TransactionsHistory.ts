import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

/* Request */
export interface TransactionsHistoryListParams extends CRUDPaginationParams, AuthParams {
    from?: number | string
    to?: number | string
    status?: string
    type?: string
}

/* Response */
export interface TransactionsHistoryItem {
    resourceId: string
    merchantId: string
    storeId: string
    chargeId?: string
    amount: number
    currency: string
    transactionType: string
    createdOn: number
}

export type ResponseTransactionsHistories = CRUDItemsResponse<TransactionsHistoryItem>

export class TransactionsHistory extends CRUDResource {

    public static routeBase: string = "(/stores/:storeId)/transaction_history"

    public get (storeId?: string,
                data?: TransactionsHistoryListParams,
                callback?: ResponseCallback<ResponseTransactionsHistories>): Promise<ResponseTransactionsHistories> {

        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

}
