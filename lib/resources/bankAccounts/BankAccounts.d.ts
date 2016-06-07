import { IListParams, PListResponse } from "../Resource";
import { IListResource, IPaginationParams } from "../ListResource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedListResource } from "../../validation/Validation";
import { PBankAccount } from "./BankAccount";
import { MerchantListResource } from "../MerchantListResource";
export interface PBankAccounts extends IPaginationParams {
}
export declare class BankAccounts extends MerchantListResource<PBankAccounts, PBankAccount> implements IListResource<PBankAccount>, IValidatedListResource<PBankAccounts> {
    urlSegment: string;
    accessType: ResourceAccessType;
    read(params?: IListParams<PBankAccounts>): Promise<PListResponse<PBankAccount>>;
}
