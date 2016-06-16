import { CRUDResource, CRUDMerchantIdParam, CRUDIdMerchantIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { GatewayCredentialsCommonParams } from "./common/GatewayCredentials"

export interface BankAccountCommonParams {
    holderName?: string
    bankName?: string
    branchName?: string
    country?: string
    bankAddress?: string
    currency?: string
    accountNumber?: string
    routingNumber?: string
    swiftCode?: string
    ifscCode?: string
    routingCode?: string
    isPrimary?: boolean
}

export interface BankAccountCreateParams extends BankAccountCommonParams {
    accountNumber: string
    bankName: string
    currency: string
    holderName: string
}

export interface BankAccountUpdateParams extends BankAccountCommonParams {}


export class BankAccounts extends CRUDResource {
    
    public routeBase: string = "/(merchants/:merchantId/)bank_accounts"

    public list (data: CRUDPaginationParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (data:BankAccountCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._createRoute(params, data, callback, { token })
    }

    public get (id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._getRoute(params, null, callback, { token })
    }

    public update (id: string, data?: BankAccountUpdateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string) {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._updateRoute(params, data, callback, { token })
    }

}