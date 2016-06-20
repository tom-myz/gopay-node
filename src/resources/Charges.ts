import {
    CRUDResource,
    CRUDStoreIdParam,
    CRUDIdStoreIdParam,
    CRUDPaginationParams
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

    public static routeBase: string = "/(merchants/:merchantId/)stores/:storeId/charges"

    constructor (api: RestAPI) {
        super(api)
        this._createRoute = this.defineRoute("POST", "/charges")
    }

    public list (storeId: string,
                 callback?: SDKCallbackFunction,
                 data?: CRUDPaginationParams,
                 merchantId?: string,
                 token?: string): Promise<any> {
        const params: CRUDStoreIdParam = { storeId, merchantId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (data: ChargeCreateParams,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        return this._createRoute(null, data, callback, { token, validationSchema : chargeCreateSchema })
    }

    public get (storeId: string,
                id: string,
                callback?: SDKCallbackFunction,
                merchantId?: string,
                token?: string): Promise<any> {
        const params: CRUDIdStoreIdParam = { id, storeId, merchantId }
        return this._getRoute(params, null, callback, { token })
    }

}
