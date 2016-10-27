import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { PaymentError } from "./common/PaymentError"
import { Metadata } from "./common/Metadata"

/* Request */
export interface RefundsListParams extends CRUDPaginationParams, AuthParams {}
export interface RefundCreateParams extends AuthParams {
    amount: number
    currency: string
    reason?: string
    message?: string
    metadata?: Metadata
}

/* Response */
export interface RefundItem {
    id: string
    chargeId: string
    ledgerId?: string
    status: string
    amount: number
    currency: string
    amountFormatted: number
    reason?: string
    message?: string
    error?: PaymentError
    metadata?: Metadata
    testMode: boolean
    createdOn: number
    updatedOn: number
}

export type ResponseRefund = RefundItem
export type ResponseRefunds = CRUDItemsResponse<RefundItem>

export class Refunds extends CRUDResource {

    public static requiredParams: Array<string> = ["amount", "currency"]

    public static routeBase: string = "/stores/:storeId/charges/:chargeId/refunds"

    public list (storeId: string,
                 chargeId: string,
                 data?: RefundsListParams,
                 callback?: ResponseCallback<ResponseRefunds>): Promise<ResponseRefunds> {

        return this._listRoute()(data, callback, ["storeId", "chargeId"], storeId, chargeId)
    }

    public create (storeId: string,
                   chargeId: string,
                   data: RefundCreateParams,
                   callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund> {

        return this._createRoute(Refunds.requiredParams)(data, callback, ["storeId", "chargeId"], storeId, chargeId)
    }

    public get (storeId: string,
                chargeId: string,
                id: string,
                data?: AuthParams,
                callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund> {

        return this._getRoute()(data, callback, ["storeId", "chargeId", "id"], storeId, chargeId, id)
    }

}
