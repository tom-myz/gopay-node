import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { PaymentError } from "./common/PaymentError"
import { Metadata } from "./common/Metadata"
import { ProcessingMode } from "./common/ProcessingMode"

export type RefundStatus = "pending" | "successful" | "failed" | "error"

export type RefundReason = "duplicate" | "fraud" | "customer_request"

/* Request */
export interface RefundsListParams extends CRUDPaginationParams, AuthParams {}

export interface RefundCreateParams extends AuthParams {
    amount: number
    currency: string
    reason?: RefundReason
    message?: string
    metadata?: Metadata
}

/* Response */
export interface RefundItem {
    id: string
    chargeId: string
    ledgerId?: string
    status: RefundStatus
    amount: number
    currency: string
    amountFormatted: number
    reason?: RefundReason
    message?: string
    error?: PaymentError
    metadata?: Metadata
    mode: ProcessingMode
    createdOn: string
}

export type ResponseRefund = RefundItem
export type ResponseRefunds = CRUDItemsResponse<RefundItem>

export class Refunds extends CRUDResource {

    public static requiredParams: Array<string> = ["amount", "currency"]

    public static routeBase: string = "/stores/:storeId/charges/:chargeId/refunds"

    public list(storeId: string,
                chargeId: string,
                data?: RefundsListParams,
                callback?: ResponseCallback<ResponseRefunds>): Promise<ResponseRefunds> {

        return this._listRoute()(data, callback, ["storeId", "chargeId"], storeId, chargeId)
    }

    public create(storeId: string,
                  chargeId: string,
                  data: RefundCreateParams,
                  callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund> {

        return this._createRoute(Refunds.requiredParams)(data, callback, ["storeId", "chargeId"], storeId, chargeId)
    }

    public get(storeId: string,
               chargeId: string,
               id: string,
               data?: AuthParams,
               callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund> {

        return this._getRoute()(data, callback, ["storeId", "chargeId", "id"], storeId, chargeId, id)
    }

    public poll(storeId: string,
                chargeId: string,
                id: string,
                data?: AuthParams,
                callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund> {
        const promise: () => Promise<ResponseRefund> = () => this._getRoute()(
            data, null, ["storeId", "chargeId", "id"], storeId, chargeId, id
        )

        return this.api.longPolling(
            promise,
            (response: ResponseRefund) => response.status !== "pending",
            callback
        )
    }

}
