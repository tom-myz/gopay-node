import {
    CRUDResource, CRUDStoreIdParam, CRUDIdStoreIdParam, CRUDPaginationParams,
    CRUDDefinedRoute
} from "./CRUDResource"
import { SDKCallbackFunction, RestAPI } from "../api/RestAPI"
import { chargeCreateSchema } from "../validation/schemas/charge"

export interface ChargeCreateParams {
    token: string
    amount: number
    currency: string
    metadata?: Object
}

export class Charges extends CRUDResource {

    static routeBase: string = "/(merchants/:merchantId/)stores/:storeId/charges"

    constructor (api: RestAPI) {
        super(api)
        this._createRoute = this.defineRoute("POST", "/charges")
    }

    public list (storeId: string, data: CRUDPaginationParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDStoreIdParam = { storeId, merchantId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (storeId: string, data: ChargeCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDStoreIdParam = { storeId, merchantId }
        return this._createRoute(params, data, callback, { token, validationSchema : chargeCreateSchema })
    }

    public get (storeId: string, id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDIdStoreIdParam = { id, storeId, merchantId }
        return this._getRoute(params, null, callback, { token })
    }

}
