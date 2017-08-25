import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { PaymentError } from "./common/PaymentError"
import { Metadata } from "./common/Metadata"
import { ProcessingMode } from "./common/ProcessingMode"

export type CancelStatus = "pending" | "successful" | "failed" | "error"

/* Request */
export interface CancelsListParams extends CRUDPaginationParams, AuthParams {}

export interface CancelCreateParams extends AuthParams {
    metadata?: Metadata
}

/* Response */
export interface CancelItem {
    id: string
    chargeId: string
    storeId?: string
    status: CancelStatus
    error?: PaymentError
    metadata?: Metadata
    mode: ProcessingMode
    createdOn: string
}

export type ResponseCancel = CancelItem
export type ResponseCancels = CRUDItemsResponse<CancelItem>

export class Cancels extends CRUDResource {

    public static requiredParams: Array<string> = []

    public static routeBase: string = "/stores/:storeId/charges/:chargeId/cancels"

    public list(storeId: string,
                chargeId: string,
                data?: CancelsListParams,
                callback?: ResponseCallback<ResponseCancels>): Promise<ResponseCancels> {

        return this._listRoute()(data, callback, ["storeId", "chargeId"], storeId, chargeId)
    }

    public create(storeId: string,
                  chargeId: string,
                  data: CancelCreateParams,
                  callback?: ResponseCallback<ResponseCancel>): Promise<ResponseCancel> {

        return this._createRoute(Cancels.requiredParams)(data, callback, ["storeId", "chargeId"], storeId, chargeId)
    }

    public get(storeId: string,
               chargeId: string,
               id: string,
               data?: AuthParams,
               callback?: ResponseCallback<ResponseCancel>): Promise<ResponseCancel> {

        return this._getRoute()(data, callback, ["storeId", "chargeId", "id"], storeId, chargeId, id)
    }

    public poll(storeId: string,
                chargeId: string,
                id: string,
                data?: AuthParams,
                callback?: ResponseCallback<ResponseCancel>): Promise<ResponseCancel> {
        const promise: () => Promise<ResponseCancel> = () => this._getRoute()(
            data, null, ["storeId", "chargeId", "id"], storeId, chargeId, id
       )

        return this.api.longPolling(
                promise,
                (response: ResponseCancel) => response.status !== "pending",
                callback
        )
    }

}
