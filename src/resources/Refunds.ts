import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { PaymentError } from "./common/PaymentError"
import { Metadata } from "./common/Metadata"
import { ProcessingMode } from "./common/ProcessingMode"
import { Resource } from "./Resource"

export const enum RefundStatus {
    PENDING    = "pending",
    SUCCESSFUL = "successful",
    FAILED     = "failed",
    ERROR      = "error"
}

export const enum RefundReason {
    DUPLICATE        = "duplicate",
    FRAUD            = "fraud",
    CUSTOMER_REQUEST = "customer_request"
}

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

    public socket(storeId: string, chargeId: string, id: string): WebSocket {
        const path: string = Resource.compilePath(`${this._routeBase}/:id`, { storeId, chargeId, id })
        const url: string = this.api.getWebSocketUrl(path)
        return new WebSocket(url)
    }

    public poll(storeId: string,
                chargeId: string,
                id: string,
                data?: AuthParams,
                callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund> {
        const promise: () => Promise<ResponseRefund> = () => this._getRoute()(
            { ...data, poll : true }, null, ["storeId", "chargeId", "id"], storeId, chargeId, id
        )

        return this.api.longPolling(
            promise,
            (response: ResponseRefund) => response.status !== "pending",
            callback
        )
    }

}
