import { CRUDResource, CRUDPaginationParams, CRUDStoreIdParam, CRUDIdStoreIdParam } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { ledgerUpdateSchema } from "../validation/schemas/ledger"

export interface LedgerUpdateParams {
    note?: string
    status?: string
}

export class Ledgers extends CRUDResource {

    public static routeBase: string = "/(merchants/:merchantId/)(stores/:storeId/)ledgers"

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
                   storeId?: string,
                   token?: string): Promise<any> {

        const params: CRUDIdStoreIdParam = { id, merchantId, storeId }
        return this._updateRoute(params, data, callback, { token, validationSchema : ledgerUpdateSchema })
    }

}
