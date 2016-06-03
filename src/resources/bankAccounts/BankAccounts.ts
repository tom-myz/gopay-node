import { IListParams, PListResponse } from "../Resource"
import { IListResource, ListResource, IPaginationParams } from "../ListResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedListResource, ValidationSchema } from "../../validation/Validation"
import { PBankAccount } from "./BankAccount"

export interface PBankAccounts extends IPaginationParams {}

export class BankAccounts extends ListResource<PBankAccounts, PBankAccount> implements IListResource<PBankAccount>, IValidatedListResource<PBankAccounts> {

    public urlSegment: string = "bank_accounts"
    public accessType: ResourceAccessType = ResourceAccessType.Token

    public read (params: IListParams<PBankAccounts>): Promise<PListResponse<PBankAccount>> {
        return this._read(params)
    }

}
