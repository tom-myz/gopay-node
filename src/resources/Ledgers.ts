/**
 *  @module Resources/Ledgers
 */

import { ResponseCallback, AuthParams, HTTPMethod } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";

export const enum LedgerOrigin {
    CHARGE = "charge",
    REFUND = "refund",
    MANUAL = "manual"
}

/* Request */
export interface LedgersListParams extends CRUDPaginationParams, AuthParams {
    all?: boolean
    from?: number | string
    to?: number | string
    min?: number
    max?: number
    currency?: string
}

/* Response */
export interface LedgerItem {
    id: string
    merchantId: string
    storeId?: string
    transferId?: string
    amount: number
    currency: string
    amountFormatted: number
    percentFee: number
    flatFee: number
    flatFeeCurrency: string
    flatFeeFormatted: number
    exchangeRate: number
    origin: LedgerOrigin
    note?: string
    createdOn: string
}

export type ResponseLedgers = CRUDItemsResponse<LedgerItem>
export type ResponseLedger = LedgerItem

export class Ledgers extends CRUDResource {

    static routeBase: string = "/transfers/:transferId/ledgers"

    list(transferId: string,
         data?: LedgersListParams,
         callback?: ResponseCallback<ResponseLedgers>): Promise<ResponseLedgers> {

        return this._listRoute()(data, callback, ["transferId"], transferId)
    }

    get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseLedger>): Promise<ResponseLedger> {
        return this.defineRoute(HTTPMethod.GET, "/ledgers/:id")(data, callback, ["id"], id)
    }

}
