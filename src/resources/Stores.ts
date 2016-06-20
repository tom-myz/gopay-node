import { CRUDResource, CRUDMerchantIdParam, CRUDIdMerchantIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { ConfigurationParams } from "./common/Configuration"
import { storeCreateSchema, storeUpdateSchema } from "../validation/schemas/store"

export interface StoreCommonParams {
    name?: string
    configuration?: ConfigurationParams
}

export interface StoreCreateParams extends StoreCommonParams {
    name: string
}

export interface StoreUpdateParams extends StoreCommonParams {}


export class Stores extends CRUDResource {

    public static routeBase: string = "/(merchants/:merchantId/)stores"

    public list (data: CRUDPaginationParams,
                 callback?: SDKCallbackFunction,
                 merchantId?: string,
                 token?: string): Promise<any> {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (data: StoreCreateParams,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._createRoute(params, data, callback, { token, validationSchema : storeCreateSchema })
    }

    public get (id: string,
                callback?: SDKCallbackFunction,
                merchantId?: string,
                token?: string): Promise<any> {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._getRoute(params, null, callback, { token })
    }

    public update (id: string,
                   data?: StoreUpdateParams,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._updateRoute(params, data, callback, { token, validationSchema : storeUpdateSchema })
    }

    public delete (id: string,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._deleteRoute(params, null, callback, { token })
    }

}
