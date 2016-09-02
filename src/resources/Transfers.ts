import {
    CRUDResource,
    CRUDMerchantIdParam,
    CRUDIdMerchantIdParam,
    CRUDPaginationParams,
    CRUDDefinedRoute
} from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { transferCreateSchema, transferUpdateSchema, transferPendingMerchantsSchema } from "../validation/schemas/transfer"

export interface TransferCommonParams {
    bankAccountId?: string
    amount?: number
    currency?: string
    status?: string
    daysPrior?: number
    metadata?: Object
}

export interface TransferCreateParams extends TransferCommonParams {
    from?: string
    to: string
}

export interface TransferUpdateParams extends TransferCommonParams {}

export interface TransferPendingMerchantParams {
    from?: string
    to: string
}


export class Transfers extends CRUDResource {

    public static routeBase: string = "/(merchants/:merchantId/)transfers"

    public _finalizeTransfer: CRUDDefinedRoute = this.defineRoute("PATCH", "/merchants/:merchantId/transfers/:id/finalize")
    public _getTransfersPendingMerchants: CRUDDefinedRoute = this.defineRoute("GET", "/transfers_pending")
    public _getMerchantPendingTransfers: CRUDDefinedRoute = this.defineRoute("GET", "/merchants/:merchantId/transfers_pending")

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

    public finalizeTransfer (id: string,
                             callback?: SDKCallbackFunction,
                             merchantId?: string,
                             token?: string): Promise<any> {
        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._finalizeTransfer(params, null, callback, { token })
    }

    public getTransfersPendingMerchants (merchantId: string,
                                         callback?: SDKCallbackFunction,
                                         data?: TransferPendingMerchantParams,
                                         token?: string): Promise<any> {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._getTransfersPendingMerchants(params, data, callback, { token })
    }

    public getMerchantPendingTransfers (merchantId: string,
                                        callback?: SDKCallbackFunction,
                                        data?: TransferPendingMerchantParams,
                                        token?: string): Promise<any> {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._getMerchantPendingTransfers(params,
                                                 data,
                                                 callback,
                                                 { token, validationSchema : transferPendingMerchantsSchema })
    }

}
