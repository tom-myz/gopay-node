import {ResponseCallback, AuthParams, PollParams} from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { PaymentError } from "./common/PaymentError"
import { Metadata } from "./common/Metadata"
import { ProcessingMode } from "./common/ProcessingMode"
import { Resource } from "./Resource"
import { WithIdempotentKey } from "./common/Common"

export const enum ChargeStatus {
    PENDING    = "pending",
    SUCCESSFUL = "successful",
    FAILED     = "failed",
    ERROR      = "error",
    CANCELLED  = "cancelled",
    AWAITING   = "awaiting",
    AUTHORIZED = "authorized"
}

/* Request */
export interface ChargesListParams extends CRUDPaginationParams, AuthParams {}

export interface ChargeCreateParams extends AuthParams, WithIdempotentKey {
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
    captureAt?: string
    status: ChargeStatus
    error?: PaymentError
    metadata?: Metadata
    mode: ProcessingMode
    createdOn: string
    transactionTokenId?: string
}

export type ResponseCharge = ChargeItem
export type ResponseCharges = CRUDItemsResponse<ChargeItem>

export class Charges extends CRUDResource {

    public static requiredParams: Array<string> = ["transactionTokenId", "amount", "currency"]

    public static routeBase: string = "(/stores/:storeId)/charges"

    public list(data?: ChargesListParams, callback?: ResponseCallback<ResponseCharges>, storeId?: string): Promise<ResponseCharges> {
        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

    public create(data: ChargeCreateParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge> {
        return this.defineRoute("POST", "/charges", Charges.requiredParams)(data, callback)
    }

    public get(storeId: string,
               id: string,
               data?: AuthParams & Partial<PollParams>,
               callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge> {
        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public poll(storeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge> {
        const promise: () => Promise<ResponseCharge> = () => this.get(
            storeId,
            id,
            { ...data, poll : true }
        )
        return this.api.longPolling(
            promise,
            (response: ResponseCharge) => response.status !== ChargeStatus.PENDING,
            callback
        )
    }

}
