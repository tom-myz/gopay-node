import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDSortingParams, CRUDItemsResponse } from "./CRUDResource"

export type BankAccountStatus = "new" | "unable_to_verify" | "verified" | "errored"

/* Request */
export type BankAccountsSortBy = "createdOn"

export interface BankAccountsListParams extends CRUDPaginationParams, CRUDSortingParams<BankAccountsSortBy>, AuthParams {
    primary?: boolean
}

export interface BankAccountCreateParams extends AuthParams {
    accountNumber: string
    country: string
    currency: string
    holderName: string
    bankName: string
    branchName?: string
    bankAddress?: string
    routingNumber?: string
    swiftCode?: string
    ifscCode?: string
    routingCode?: string
}
export interface BankAccountUpdateParams extends AuthParams {
    primary?: boolean
    accountNumber?: string
    holderName?: string
    bankAddress?: string
    currency?: string
    bankName: string
    branchName?: string
    routingNumber?: string
    swiftCode?: string
    ifscCode?: string
    routingCode?: string
}

/* Response */
export interface BankAccountItem {
    id: string
    holderName: string
    bankName: string
    branchName?: string
    country: string
    bankAddress?: string
    currency: string
    routingNumber?: string
    swiftCode?: string
    ifscCode?: string
    routingCode?: string
    lastFour: string
    status: BankAccountStatus
    createdOn: number
    primary: boolean
    accountNumber: string
}

export type ResponseBankAccount = BankAccountItem
export type ResponseBankAccounts = CRUDItemsResponse<BankAccountItem>

export class BankAccounts extends CRUDResource {

    public static requiredParams: Array<string> = ["accountNumber", "country", "currency", "holderName", "bankName"]

    public static routeBase: string = "/bank_accounts"

    public list(data?: BankAccountsListParams, callback?: ResponseCallback<ResponseBankAccounts>): Promise<ResponseBankAccounts> {
        return this._listRoute()(data, callback)
    }

    public create(data: BankAccountCreateParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount> {
        return this._createRoute(BankAccounts.requiredParams)(data, callback)
    }

    public get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount> {
        return this._getRoute()(data, callback, ["id"], id)
    }

    public update(id: string,
                  data?: BankAccountUpdateParams,
                  callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount> {
        return this._updateRoute()(data, callback, ["id"], id)
    }

    public delete(id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {
        return this._deleteRoute()(data, callback, ["id"], id)
    }

    public getPrimary(data?: AuthParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount> {
        return this.defineRoute("GET", `${this._routeBase}/primary`)(data, callback)
    }

}
