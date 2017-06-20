import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { PaymentError } from "./common/PaymentError"
import { Metadata } from "./common/Metadata"
import { ProcessingMode } from "./common/ProcessingMode"

export type LedgerOrigin = "charge" | "refund" | "manual"

/* Request */
export interface LedgersListParams extends CRUDPaginationParams, AuthParams {
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
    origin: LedgerOrigin
    note?: string
    createdOn: string
}

export type ResponseLedgers = CRUDItemsResponse<LedgerItem>

export class Ledgers extends CRUDResource {

    public static routeBase: string = "/transfers/:transferId/ledgers"

    public list(transferId: string,
                data?: LedgersListParams,
                callback?: ResponseCallback<ResponseLedgers>): Promise<ResponseLedgers> {

        return this._listRoute()(data, callback, ["transferId"], transferId)
    }

}
