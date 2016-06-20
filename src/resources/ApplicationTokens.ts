import { CRUDResource, CRUDStoreIdParam, CRUDPaginationParams, CRUDIdStoreIdParam } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"

export class ApplicationTokens extends CRUDResource {

    public routeBase: string = "/(merchants/:merchantId/)stores/:storeId/app_tokens"

    public list (storeId: string,
                 data: CRUDPaginationParams,
                 callback?: SDKCallbackFunction,
                 merchantId?: string,
                 token?: string): Promise<any> {
        const params: CRUDStoreIdParam = { storeId, merchantId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (storeId: string,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDStoreIdParam = { storeId, merchantId }
        return this._createRoute(params, null, callback, { token })
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
