/**
 *  @module Resources/Stores
 */

import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { ConfigurationCreateParams, ConfigurationUpdateParams, ConfigurationItem } from "./common/Configuration"

/* Request */
export interface StoresListParams extends CRUDPaginationParams, AuthParams {
    search?: string
}
export interface StoreCreateParams extends AuthParams {
    name: string
    configuration?: ConfigurationCreateParams
}
export interface StoreUpdateParams extends AuthParams {
    name?: string
    configuration?: ConfigurationUpdateParams
}

/* Response */
export interface StoreItem {
    id: string
    merchantId: string
    name: string
    createdOn: string
    configuration: ConfigurationItem
}

export type ResponseStore = StoreItem
export type ResponseStores = CRUDItemsResponse<StoreItem>

export class Stores extends CRUDResource {

    static requiredParams: string[] = ["name"]

    static routeBase: string = "/stores"

    list(data?: StoresListParams, callback?: ResponseCallback<ResponseStores>): Promise<ResponseStores> {
        return this._listRoute()(data, callback)
    }

    create(data: StoreCreateParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore> {
        return this._createRoute(Stores.requiredParams)(data, callback)
    }

    get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore> {
        return this._getRoute()(data, callback, ["id"], id)
    }

    update(id: string, data?: StoreUpdateParams, callback?: ResponseCallback<ResponseStore>): Promise<ResponseStore> {
        return this._updateRoute()(data, callback, ["id"], id)
    }

    delete(id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {
        return this._deleteRoute()(data, callback, ["id"], id)
    }

}
