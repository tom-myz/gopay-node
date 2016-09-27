import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface BankAccountsListParams extends CRUDPaginationParams, AuthParams {
}
export interface BankAccountCreateParams extends AuthParams {
    accountNumber: string;
    country: string;
    currency: string;
    holderName: string;
    bankName: string;
    branchName?: string;
    bankAddress?: string;
    routingNumber?: string;
    swiftCode?: string;
    ifscCode?: string;
    routingCode?: string;
}
export interface BankAccountUpdateParams extends AuthParams {
    isPrimary?: boolean;
    accountNumber?: string;
    holderName?: string;
    bankAddress?: string;
    currency?: string;
    bankName: string;
    branchName?: string;
    routingNumber?: string;
    swiftCode?: string;
    ifscCode?: string;
    routingCode?: string;
}
export interface BankAccountItem {
    id: string;
    holderName: string;
    bankName: string;
    branchName?: string;
    country: string;
    bankAddress?: string;
    currency: string;
    routingNumber?: string;
    swiftCode?: string;
    ifscCode?: string;
    routingCode?: string;
    lastFour: string;
    active: boolean;
    status: string;
    createdOn: number;
    updatedOn: number;
    primaryAccount: boolean;
}
export declare type ResponseBankAccount = BankAccountItem;
export declare type ResponseBankAccounts = CRUDItemsResponse<BankAccountItem>;
export declare class BankAccounts extends CRUDResource {
    static requiredParams: Array<string>;
    static routeBase: string;
    list(data?: BankAccountsListParams, callback?: ResponseCallback<ResponseBankAccounts>): Promise<ResponseBankAccounts>;
    create(data: BankAccountCreateParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount>;
    get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount>;
    update(id: string, data?: BankAccountUpdateParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount>;
    delete(id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse>;
    getPrimary(data?: AuthParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount>;
}
