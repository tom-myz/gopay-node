import { CRUDResource, CRUDPaginationParams, CRUDIdParam } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { ledgerUpdateSchema } from "../validation/schemas/ledger"

export interface LedgerUpdateParams {
    note?: string
    status?: string
}

export class Ledger extends CRUDResource {

    public static routeBase: string = "/ledger"

    public list (callback?: SDKCallbackFunction, data?: CRUDPaginationParams, token?: string): Promise<any> {
        return this._listRoute(null, data, callback, { token })
    }

    public update (id: string, data?: LedgerUpdateParams, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        const params: CRUDIdParam = { id }
        return this._updateRoute(params, data, callback, { token, validationSchema : ledgerUpdateSchema })
    }

}
