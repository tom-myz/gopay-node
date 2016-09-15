import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

/* Request */
export interface BankAccountsListParams extends CRUDPaginationParams, AuthParams {}
export interface BankAccountCreateParams extends AuthParams {

}
export interface BankAccountUpdateParams extends AuthParams {

}

/* Response */
export interface BankAccountItem {
    id: string
}

export type ResponseBankAccount = BankAccountItem
export type ResponseBankAccounts = CRUDItemsResponse<BankAccountItem>

export class BankAccounts extends CRUDResource {

    public static routeBase: string = "/bank_accounts"

    public list (data?: BankAccountsListParams, callback?: ResponseCallback<ResponseBankAccounts>): Promise<ResponseBankAccounts> {
        return this._listRoute()(data, callback)
    }

    public create (data: BankAccountCreateParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount> {
        return this._createRoute([])(data, callback)
    }

    public get (id: string, data?: AuthParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount> {
        return this._getRoute()(data, callback, ["id"], id)
    }

    public update (id: string,
                   data?: BankAccountUpdateParams,
                   callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount> {
        return this._updateRoute()(data, callback, ["id"], id)
    }

    public delete (id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {
        return this._deleteRoute()(data, callback, ["id"], id)
    }

    public getPrimary (data?: AuthParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount> {
        return this.defineRoute("GET", `${this._routeBase}/primary`)(data, callback)
    }

}
