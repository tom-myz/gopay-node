import { CRUDResource, CRUDIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction, RestAPI } from "../api/RestAPI"
import { ContactInfoParams } from "./common/ContactInfo"
import { ConfigurationParams } from "./common/Configuration"
import { merchantCreateSchema, merchantUpdateSchema } from "../validation/schemas/merchant"

export interface MerchantCommonParams {
    email?: string
    address?: ContactInfoParams
    configuration?: ConfigurationParams
}

export interface MerchantCreateParams extends MerchantCommonParams {
    email: string
    password: string
}

export interface MerchantUpdateParams extends MerchantCommonParams {}


export class Merchants extends CRUDResource {

    static routeBase: string = "/merchants"

    public list (data: CRUDPaginationParams, callback?: SDKCallbackFunction, token?: string) {
        return this._listRoute(null, data, callback, { token })
    }

    public create (data: MerchantCreateParams, callback?: SDKCallbackFunction, token?: string) {
        return this._createRoute(null, data, callback, { token, validationSchema : merchantCreateSchema })
    }

    public get (id: string, callback?: SDKCallbackFunction, token?: string) {
        const params: CRUDIdParam = { id }
        return this._getRoute(params, null, callback, { token })
    }

    public update (id: string, data?: MerchantUpdateParams, callback?: SDKCallbackFunction, token?: string) {
        const params: CRUDIdParam = { id }
        return this._updateRoute(params, data, callback, { token, validationSchema : merchantUpdateSchema })
    }

}
