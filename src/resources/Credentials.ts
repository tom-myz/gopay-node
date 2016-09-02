import { CRUDResource, CRUDMerchantIdParam, CRUDIdMerchantIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { credentialsCreateSchema, credentialsUpdateSchema } from "../validation/schemas/credentials"

export interface CredentialsCommonParams {
    gateway?: string
    credentials?: any
    currencies?: Array<string>
}

export interface CredentialsCreateParams extends CredentialsCommonParams {
    gateway: string
    credentials: any
    currencies: Array<string>
}

export interface CredentialsUpdateParams extends CredentialsCommonParams {}


export class Credentials extends CRUDResource {

    public static routeBase: string = "/(merchants/:merchantId/)credentials"

    public list (callback?: SDKCallbackFunction,
                 data?: CRUDPaginationParams,
                 merchantId?: string,
                 token?: string): Promise<any> {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (data: CredentialsCreateParams,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._createRoute(params, data, callback, { token, validationSchema : credentialsCreateSchema(data.gateway) })
    }

    public get (id: string,
                callback?: SDKCallbackFunction,
                merchantId?: string,
                token?: string): Promise<any> {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._getRoute(params, null, callback, { token })
    }

    public update (id: string,
                   data?: CredentialsUpdateParams,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._updateRoute(params, data, callback, { token, validationSchema : credentialsUpdateSchema(data.gateway) })
    }

    public delete (id: string,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._deleteRoute(params, null, callback, { token })
    }

}
