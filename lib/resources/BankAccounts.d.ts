import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface BankAccountsListParams extends CRUDPaginationParams, AuthParams {
}
export interface BankAccountCreateParams extends AuthParams {
}
export interface BankAccountUpdateParams extends AuthParams {
}
export interface BankAccountItem {
    id: string;
}
export declare type ResponseBankAccount = BankAccountItem;
export declare type ResponseBankAccounts = CRUDItemsResponse<BankAccountItem>;
export declare class BankAccounts extends CRUDResource {
    static routeBase: string;
    list(data?: BankAccountsListParams, callback?: ResponseCallback<ResponseBankAccounts>): Promise<ResponseBankAccounts>;
    create(data: BankAccountCreateParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount>;
    get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount>;
    update(id: string, data?: BankAccountUpdateParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount>;
    delete(id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse>;
    getPrimary(data?: AuthParams, callback?: ResponseCallback<ResponseBankAccount>): Promise<ResponseBankAccount>;
}
