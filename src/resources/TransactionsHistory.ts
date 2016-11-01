import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDSortingParams, CRUDItemsResponse } from "./CRUDResource"
import { ChargeStatus } from "./Charges"
import { RefundStatus } from "./Refunds"

export type TransactionsHistoryType = "charge" | "refund"

export type TransactionsHistoryStatus = ChargeStatus | RefundStatus

/* Request */
export type TransactionHistorySortBy = "createdOn"

export interface TransactionsHistoryListParams extends CRUDPaginationParams,
                                                       CRUDSortingParams<TransactionHistorySortBy>,
                                                       AuthParams {
    from?: number | string
    to?: number | string
    status?: TransactionsHistoryStatus
    type?: TransactionsHistoryType
    search?: string
}

/* Response */
export interface TransactionsHistoryItem {
    resourceId: string
    merchantId: string
    storeId: string
    chargeId?: string
    amount: number
    currency: string
    amountFormatted: number
    type: TransactionsHistoryType
    status: TransactionsHistoryStatus
    createdOn: number
}

export type ResponseTransactionsHistories = CRUDItemsResponse<TransactionsHistoryItem>

export class TransactionsHistory extends CRUDResource {

    public static routeBase: string = "(/stores/:storeId)/transaction_history"

    public list (storeId?: string,
                 data?: TransactionsHistoryListParams,
                 callback?: ResponseCallback<ResponseTransactionsHistories>): Promise<ResponseTransactionsHistories> {

        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

}
