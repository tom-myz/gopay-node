import { CRUDResource, CRUDMerchantIdParam, CRUDIdMerchantIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { GatewayCredentialsCommonParams } from "./common/GatewayCredentials"

export interface StoreCommonParams {
    name?: string
    gatewayCredentials?: GatewayCredentialsCommonParams
}

export interface StoreCreateParams extends StoreCommonParams {
    name: string
}

export interface StoreUpdateParams extends StoreCommonParams {}


export class Stores extends CRUDResource {

    public routeBase: string = "/(merchants/:merchantId/)stores"

    public list (data: CRUDPaginationParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (data:StoreCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._createRoute(params, data, callback, { token })
    }

    public get (id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._getRoute(params, null, callback, { token })
    }

    public update (id: string, data?: StoreUpdateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._updateRoute(params, data, callback, { token })
    }

}