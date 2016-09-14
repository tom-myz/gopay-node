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

    public list<A> (data?: StoresListParams, callback?: ResponseCallback<ResponseMerchants>, _params?: A): Promise<ResponseMerchants> {
        return this._listRoute()(_params, null, callback)
    }

    public create<A> (data: StoreCreateParams, callback?: ResponseCallback<ResponseMerchant>, _params?: A): Promise<ResponseMerchant> {
        return this._createRoute(null, ["name"])(_params, data, callback)
    }
    
    public get<A> (id: string, callback?: ResponseCallback<ResponseMerchant>, _params?: A): Promise<ResponseMerchant> {
        const params: CRUDIdParam & A = Object.assign({ id }, _params)
        return this._getRoute(["id"])(params, null, callback)
    }

    public update<A> (id: string, data?: any, callback?: ResponseCallback<ResponseMerchant>, _params?: A): Promise<ResponseMerchant> {
        const params: CRUDIdParam & A = Object.assign({ id }, _params)
        return this._updateRoute(["id"])(params, data, callback)
    }

    public delete<A> (id: string, callback?: ResponseCallback<ErrorResponse>, _params?: A): Promise<ErrorResponse> {
        const params: CRUDIdParam & A = Object.assign({ id }, _params)
        return this._deleteRoute(["id"])(params, null, callback)
    }

}