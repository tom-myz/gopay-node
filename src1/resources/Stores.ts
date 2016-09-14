import { ResponseCallback, ErrorResponse } from "../api/RestAPI"
import { DefinedRoute } from "./Resource"
import { CRUDResource, CRUDIdParam, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

/* Request */
export interface StoresListParams extends CRUDPaginationParams {}
export interface StoreCreateParams {
    name: string
}

/* Response */
export interface StoreItem {
    id: string
}

export type ResponseMerchant = StoreItem | ErrorResponse
export type ResponseMerchants = CRUDItemsResponse<StoreItem> | ErrorResponse


export class Stores extends CRUDResource {

    public static routeBase: string = "/stores"

    public list (data?: StoresListParams, callback?: ResponseCallback<ResponseMerchants>): Promise<ResponseMerchants> {
        return this._listRoute()(null, callback)
    }

    public create (data: StoreCreateParams, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant> {
        return this._createRoute(["name"])(data, callback)
    }
    
    public get (id: string, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant> {
        return this._getRoute()(null, callback, ["id"], id)
    }

    public update (id: string, data?: any, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant> {
        return this._updateRoute()(data, callback, ["id"], id)
    }

    public delete (id: string, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {
        return this._deleteRoute()(null, callback, ["id"], id)
    }

}