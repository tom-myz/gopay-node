import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

/* Request */
export interface RefundsListParams extends CRUDPaginationParams, AuthParams {}
export interface RefundCreateParams extends AuthParams {

}

/* Response */
export interface RefundItem {
    id: string
}

export type ResponseRefund = RefundItem
export type ResponseRefunds = CRUDItemsResponse<RefundItem>

export class Refunds extends CRUDResource {

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

        return this._createRoute()(data, callback, ["storeId", "chargeId"], storeId, chargeId)
    }

    public get (storeId: string,
                chargeId: string,
                id: string,
                data?: AuthParams,
                callback?: ResponseCallback<ResponseRefund>): Promise<ResponseRefund> {

        return this._getRoute()(data, callback, ["storeId", "chargeId", "id"], storeId, chargeId, id)
    }

}
