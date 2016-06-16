import { CRUDResource, CRUDMerchantIdParam, CRUDIdMerchantIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { GatewayCredentialsCommonParams } from "./common/GatewayCredentials"

export interface TransferCommonParams {
    bankAccountId?: string
    amount?: number
    currency?: string
    status?: string
    daysPrior?: number
    metadata?: Object
}

export interface TransferCreateParams extends TransferCommonParams {
    daysPrior: number
}

export interface TransferUpdateParams extends TransferCommonParams {}


export class Transfers extends CRUDResource {

    public routeBase: string = "/(merchants/:merchantId/)transfers"

    public list (data: CRUDPaginationParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (data: TransferCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._createRoute(params, data, callback, { token })
    }

    public get (id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._getRoute(params, null, callback, { token })
    }

    public update (id: string, data?: TransferUpdateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._updateRoute(params, data, callback, { token })
    }

}