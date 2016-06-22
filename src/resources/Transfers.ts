import { CRUDResource, CRUDMerchantIdParam, CRUDIdMerchantIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { transferCreateSchema, transferUpdateSchema } from "../validation/schemas/transfer"

export interface TransferCommonParams {
    bankAccountId?: string
    amount?: number
    currency?: string
    status?: string
    daysPrior?: number
    metadata?: Object
}

export interface TransferCreateParams extends TransferCommonParams {
    processFrom?: string
    processTo: string
}

export interface TransferUpdateParams extends TransferCommonParams {}


export class Transfers extends CRUDResource {

    public static routeBase: string = "/(merchants/:merchantId/)transfers"

    public list (callback?: SDKCallbackFunction,
                 data?: CRUDPaginationParams,
                 merchantId?: string,
                 token?: string): Promise<any> {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (data: TransferCreateParams,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._createRoute(params, data, callback, { token, validationSchema : transferCreateSchema })
    }

    public get (id: string,
                callback?: SDKCallbackFunction,
                merchantId?: string,
                token?: string): Promise<any> {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._getRoute(params, null, callback, { token })
    }

    public update (id: string,
                   data?: TransferUpdateParams,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._updateRoute(params, data, callback, { token, validationSchema : transferUpdateSchema })
    }

}
