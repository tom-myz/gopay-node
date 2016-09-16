import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

/* Request */
export interface ChargesListParams extends CRUDPaginationParams, AuthParams {}
export interface ChargeCreateParams extends AuthParams {
    name: string
}

/* Response */
export interface ChargeItem {
    id: string
    status: string
}

export type ResponseCharge = ChargeItem
export type ResponseCharges = CRUDItemsResponse<ChargeItem>

export class Charges extends CRUDResource {

    public static routeBase: string = "/stores/:storeId/charges"

    public list (storeId: string, data?: ChargesListParams, callback?: ResponseCallback<ResponseCharges>): Promise<ResponseCharges> {
        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

    public create (data: ChargeCreateParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge> {
        return this.defineRoute("POST", "/charges")(data, callback)
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
