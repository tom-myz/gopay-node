import { CRUDResource, CRUDStoreIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"

export class ApplicationTokens extends CRUDResource {

    public routeBase: string = "/(merchants/:merchantId/)stores/:storeId/app_tokens"

    public list (storeId: string, data: CRUDPaginationParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDStoreIdParam = { storeId, merchantId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (storeId: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDStoreIdParam = { storeId, merchantId }
        return this._createRoute(params, null, callback, { token })
    }

}