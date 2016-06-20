import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export interface BankAccountCommonParams {
    holderName?: string;
    bankName?: string;
    branchName?: string;
    country?: string;
    bankAddress?: string;
    currency?: string;
    accountNumber?: string;
    routingNumber?: string;
    swiftCode?: string;
    ifscCode?: string;
    routingCode?: string;
    isPrimary?: boolean;
}
export interface BankAccountCreateParams extends BankAccountCommonParams {
    accountNumber: string;
    bankName: string;
    currency: string;
    holderName: string;
}
export interface BankAccountUpdateParams extends BankAccountCommonParams {
}
export declare class BankAccounts extends CRUDResource {
    static routeBase: string;
    list(data: CRUDPaginationParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    create(data: BankAccountCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    get(id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    update(id: string, data?: BankAccountUpdateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    delete(id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
}
