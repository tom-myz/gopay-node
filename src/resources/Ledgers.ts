import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDSortingParams, CRUDItemsResponse } from "./CRUDResource"
import { PaymentError } from "./common/PaymentError"
import { Metadata } from "./common/Metadata"
import { ProcessingMode } from "./common/ProcessingMode"

/* Request */
export type LedgersSortBy = "createdOn"

export interface LedgersListParams extends CRUDPaginationParams, CRUDSortingParams<LedgersSortBy>, AuthParams {
    all?: boolean
    from?: number | string
    to?: number | string
    min?: number
    max?: number
    currency?: string
}

/* Response */
export interface LedgerItem {
    id: string
    merchantId: string
    storeId?: string
    transferId?: string
    amount: number
    currency: string
    amountFormatted: number
    percentFee: number
    flatFee: number
    flatFeeCurrency: string
    flatFeeFormatted: number
    exchangeRate: number
    note?: string
    createdOn: number
}

export type ResponseLedgers = CRUDItemsResponse<LedgerItem>

export class Ledgers extends CRUDResource {

    public static routeBase: string = "(/transfers/:transferId)/ledgers"

    public list (data?: LedgersListParams,
                 callback?: ResponseCallback<ResponseLedgers>,
                 transferId?: string): Promise<ResponseLedgers> {

        return this._listRoute()(data, callback, ["transferId"], transferId)
    }

}
