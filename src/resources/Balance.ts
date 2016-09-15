import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams } from "./CRUDResource"

/* Request */
export interface BalancesListParams extends CRUDPaginationParams, AuthParams {}

/* Response */
export interface BalanceItem {
    currency: string
    currentBalance: number
    overallBalance: number
    merchantId: string
    storeId: string
}
export interface BalancesItems {
    balances: Array<BalanceItem>
}

export type ResponseBalance = BalanceItem
export type ResponseBalances = BalancesItems

export class Balance extends CRUDResource {

    public static routeBase: string = "(/stores/:storeId)/balance"

    public get (storeId?: string,
                data?: BalancesListParams,
                callback?: ResponseCallback<ResponseBalances>): Promise<ResponseBalances> {

        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

}
