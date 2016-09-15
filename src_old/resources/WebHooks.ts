import { CRUDResource, CRUDStoreIdParam, CRUDIdStoreIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { webHookCreateSchema, webHookUpdateSchema } from "../validation/schemas/webhook"

export interface WebHookCommonParams {
}

export interface WebHookCreateParams extends WebHookCommonParams {}
export interface WebHookUpdateParams extends WebHookCommonParams {}


export class WebHooks extends CRUDResource {

    public static routeBase: string = "/(merchants/:merchantId/)stores/:storeId/webhooks"

    public list (storeId: string,
                 data?: CRUDPaginationParams,
                 callback?: SDKCallbackFunction,
                 merchantId?: string,
                 token?: string): Promise<any> {
        const params: CRUDStoreIdParam = { storeId, merchantId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (storeId: string,
                   data: WebHookCreateParams,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDStoreIdParam = { storeId, merchantId }
        return this._createRoute(params, data, callback, { token, validationSchema : webHookCreateSchema })
    }

    public get (storeId: string,
                id: string,
                callback?: SDKCallbackFunction,
                merchantId?: string,
                token?: string): Promise<any> {
        const params: CRUDIdStoreIdParam = { id, storeId, merchantId }
        return this._getRoute(params, null, callback, { token })
    }

    public update (storeId: string,
                   id: string,
                   data?: WebHookUpdateParams,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDIdStoreIdParam = { id, storeId, merchantId }
        return this._updateRoute(params, data, callback, { token, validationSchema : webHookUpdateSchema })
    }

    public delete (storeId: string,
                   id: string,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDIdStoreIdParam = { id, storeId, merchantId }
        return this._deleteRoute(params, null, callback, { token })
    }

}
