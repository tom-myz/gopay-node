import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDSortingParams, CRUDItemsResponse } from "./CRUDResource"
import { PaymentError } from "./common/PaymentError"
import { Metadata } from "./common/Metadata"
import { ProcessingMode } from "./common/ProcessingMode"

export type ChargeStatus = "pending" | "successful" | "failed" | "error"

/* Request */
export type ChargesSortBy = "createdOn"

export interface ChargesListParams extends CRUDPaginationParams, CRUDSortingParams<ChargesSortBy>, AuthParams {}

export interface ChargeCreateParams extends AuthParams {
    transactionTokenId: string
    amount: number
    currency: string
    metadata?: Metadata
}

/* Response */
export interface ChargeItem {
    id: string
    merchantId: string
    storeId: string
    ledgerId?: string
    subscriptionId?: string
    requestedAmount: number
    requestedCurrency: string
    requestedAmountFormatted: number
    chargedAmount: number
    chargedCurrency: string
    chargedAmountFormatted: number
    status: ChargeStatus
    error?: PaymentError
    metadata?: Metadata
    mode: ProcessingMode
    createdOn: number
    transactionTokenId?: string
}

export type ResponseCharge = ChargeItem
export type ResponseCharges = CRUDItemsResponse<ChargeItem>

export class Charges extends CRUDResource {

    public static requiredParams: Array<string> = ["transactionTokenId", "amount", "currency"]

    public static routeBase: string = "/stores/:storeId/charges"

    public list (storeId: string, data?: ChargesListParams, callback?: ResponseCallback<ResponseCharges>): Promise<ResponseCharges> {
        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

    public create (data: ChargeCreateParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge> {
        return this.defineRoute("POST", "/charges", Charges.requiredParams)(data, callback)
    }

    public get (storeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge> {
        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public poll (storeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge> {
        const promise: () => Promise<ResponseCharge> = () => this._getRoute()(data, null, ["storeId", "id"], storeId, id)
        return this.api.longPolling(
            promise,
            (response: ResponseCharge) => response.status !== "pending",
            callback
        )
    }

}
