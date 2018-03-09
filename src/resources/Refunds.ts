/**
 *  @module Resources/Refunds
 */

import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
import { PaymentError, Metadata } from "./common/types";
import { ProcessingMode } from "./common/enums";

export const enum RefundStatus {
    PENDING    = "pending",
    SUCCESSFUL = "successful",
    FAILED     = "failed",
    ERROR      = "error"
}

export const enum RefundReason {
    DUPLICATE        = "duplicate",
    FRAUD            = "fraud",
    CUSTOMER_REQUEST = "customer_request",
    CHARGEBACK       = "chargeback"
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

export interface RefundUpdateParams extends AuthParams {
    status?: RefundStatus
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

    static requiredParams: string[] = ["amount", "currency"]

    static routeBase: string = "/stores/:storeId/charges/:chargeId/refunds"

    list(storeId: string,
         chargeId: string,
         data?: RefundsListParams,
         callback?: ResponseCallback<ResponseRefunds>): Promise<ResponseRefunds> {

        return this._listRoute()(data, callback, ["storeId", "chargeId"], storeId, chargeId)
    }

    create(storeId: string,
           chargeId: string,
           data: RefundCreateParams,
           callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund> {

        return this._createRoute(Refunds.requiredParams)(data, callback, ["storeId", "chargeId"], storeId, chargeId)
    }

    get(storeId: string,
        chargeId: string,
        id: string,
        data?: AuthParams,
        callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund> {

        return this._getRoute()(data, callback, ["storeId", "chargeId", "id"], storeId, chargeId, id)
    }

    update(storeId: string,
           chargeId: string,
           id: string,
           data?: RefundUpdateParams,
           callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund> {

        return this._updateRoute()(data, callback, ["storeId", "chargeId", "id"], storeId, chargeId, id)
    }

    poll(storeId: string,
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
