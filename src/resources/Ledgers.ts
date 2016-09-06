import {
    CRUDResource,
    CRUDPaginationParams,
    CRUDStoreIdParam,
    CRUDIdStoreIdParam,
    CRUDDefinedRoute,
    CRUDTransferIdParam,
    CRUDIdMerchantIdParam
} from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { ledgerUpdateSchema, ledgerCreateForTransferSchema, ledgerBalanceSchema } from "../validation/schemas/ledger"

export interface LedgerUpdateParams {
    note?: string
}

export interface LedgerCreateForTransferParams {
    amount: number
    currency: string
    note?: string
}

export interface LedgerBalanceParams {
    currency?: string
}

export class Ledgers extends CRUDResource {

    public static routeBase: string = "/(merchants/:merchantId/)(stores/:storeId/)ledgers"

    public _createLedgerForTransfer: CRUDDefinedRoute = this.defineRoute("POST", "/merchants/:merchantId/transfers/:transferId/ledgers")
    public _getBalance: CRUDDefinedRoute = this.defineRoute("GET", "/merchants/:id/(stores/:storeId/)balance")
    public _getForTransfer: CRUDDefinedRoute = this.defineRoute("GET", "/(merchants/:merchantId/)transfers/:transferId/ledgers")

    public list (callback?: SDKCallbackFunction,
                 data?: CRUDPaginationParams,
                 merchantId?: string,
                 storeId?: string,
                 token?: string): Promise<any> {

        const params: CRUDStoreIdParam = { merchantId, storeId }
        return this._listRoute(params, data, callback, { token })
    }

    public update (id: string,
                   data?: LedgerUpdateParams,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {

        const params: CRUDIdMerchantIdParam = { id, merchantId }
        return this._updateRoute(params, data, callback, { token, validationSchema : ledgerUpdateSchema })
    }

    public createLedgerForTransfer (data: LedgerCreateForTransferParams,
                                    callback?: SDKCallbackFunction,
                                    merchantId?: string,
                                    transferId?: string,
                                    token?: string): Promise<any> {

        const params: CRUDTransferIdParam = { merchantId, transferId }
        return this._createLedgerForTransfer(params,
                                             data,
                                             callback,
                                             { token, validationSchema : ledgerCreateForTransferSchema })
    }

    public getForTransfer (callback?: SDKCallbackFunction,
                           data?: CRUDPaginationParams,
                           merchantId?: string,
                           transferId?: string,
                           token?: string): Promise<any> {

        const params: CRUDTransferIdParam = { merchantId, transferId }
        return this._getForTransfer(params, data, callback, { token })
    }

    public getBalance (callback?: SDKCallbackFunction,
                       data?: LedgerBalanceParams,
                       id?: string,
                       storeId?: string,
                       token?: string): Promise<any> {
        return this._getBalance({ id, storeId }, data, callback, { token, validationSchema : ledgerBalanceSchema })
    }

}
