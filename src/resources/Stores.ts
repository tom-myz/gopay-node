import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

/* Request */
export interface StoresListParams extends CRUDPaginationParams, AuthParams {}
export interface StoreCreateParams extends AuthParams {
    name: string
}
export interface StoreUpdateParams extends AuthParams {
    name: string
}

/* Response */
export interface StoreItem {
    id: string
}

export type ResponseStore = StoreItem
export type ResponseStores = CRUDItemsResponse<StoreItem>

export class Stores extends CRUDResource {

    public static routeBase: string = "/stores"

    public list (data?: StoresListParams, callback?: ResponseCallback<ResponseStores>): Promise<ResponseStores> {
        return this._listRoute()(data, callback)
    }

    public create (data: StoreCreateParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore> {
        return this._createRoute(["name"])(data, callback)
    }

    public get (id: string, data?: AuthParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore> {
        return this._getRoute()(data, callback, ["id"], id)
    }

    public update (id: string, data?: StoreUpdateParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore> {
        return this._updateRoute()(data, callback, ["id"], id)
    }

    public delete (id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {
        return this._deleteRoute()(data, callback, ["id"], id)
    }

}
