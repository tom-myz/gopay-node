import { ResponseCallback, ErrorResponse, AuthParams, HTTPMethod } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

export const enum BankAccountStatus {
    NEW              = "new",
    UNABLE_TO_VERIFY = "unable_to_verify",
    VERIFIED         = "verified",
    ERRORED          = "errored"
}

export const enum BankAccountType {
    CHECKING = "checking",
    SAVINGS  = "savings"
}

/* Request */
export interface BankAccountsListParams extends CRUDPaginationParams, AuthParams {
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
    accountType: BankAccountType
}
export type BankAccountUpdateParams = Partial<BankAccountCreateParams>

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
    accountType: BankAccountType
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
        return this.defineRoute(HTTPMethod.GET, `${this._routeBase}/primary`)(data, callback)
    }

}
