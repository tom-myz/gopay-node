/**
 *  @module Resources/Charges
 */

import { ResponseCallback, PollParams, HTTPMethod, SendData } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { PaymentError, Metadata } from "./common/types"
import { ProcessingMode } from "./common/enums"
import { CaptureStatus } from "./Captures";
import { TransactionTokenType } from "./TransactionTokens";

export enum ChargeStatus {
    PENDING    = "pending",
    SUCCESSFUL = "successful",
    FAILED     = "failed",
    ERROR      = "error",
    CANCELED   = "canceled",
    AWAITING   = "awaiting",
    AUTHORIZED = "authorized"
}

/* Request */
export type ChargesListParams = CRUDPaginationParams;

export interface ChargeCreateParams {
    transactionTokenId: string
    amount: number
    currency: string
    captureAt?: string | number
    capture?: boolean
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
    captureStatus?: CaptureStatus
    status: ChargeStatus
    error?: PaymentError
    metadata?: Metadata
    mode: ProcessingMode
    createdOn: string
    transactionTokenId?: string
    transactionTokenType: TransactionTokenType
}

export type ResponseCharge = ChargeItem
export type ResponseCharges = CRUDItemsResponse<ChargeItem>

export class Charges extends CRUDResource {

    static requiredParams: string[] = ["transactionTokenId", "amount", "currency"];

    static routeBase: string = "/stores/:storeId/charges";

    list(data?: SendData<ChargesListParams>, callback?: ResponseCallback<ResponseCharges>, storeId?: string): Promise<ResponseCharges> {
        return this.defineRoute(HTTPMethod.GET, "(/stores/:storeId)/charges")(data, callback, ["storeId"], storeId)
    }

    create(data: SendData<ChargeCreateParams>, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge> {
        return this.defineRoute(HTTPMethod.POST, "/charges", Charges.requiredParams)(data, callback)
    }

    get(storeId: string,
        id: string,
        data?: SendData<PollParams>,
        callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge> {
        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    poll(storeId: string, id: string, data?: SendData<void>, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge> {
        const promise: () => Promise<ResponseCharge> = () => this.get(
            storeId,
            id,
            { ...(data as object), polling : true }
        );
        return this.api.longPolling(
            promise,
            (response: ResponseCharge) => response.status !== ChargeStatus.PENDING,
            callback
        )
    }

}
