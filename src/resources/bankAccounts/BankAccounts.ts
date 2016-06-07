import { IListParams, PListResponse } from "../Resource"
import { IListResource, IPaginationParams } from "../ListResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedListResource } from "../../validation/Validation"
import { PBankAccount } from "./BankAccount"
import { MerchantListResource } from "../MerchantListResource"

export interface PBankAccounts extends IPaginationParams {}

export class BankAccounts
    extends MerchantListResource<PBankAccounts, PBankAccount>
    implements IListResource<PBankAccount>, IValidatedListResource<PBankAccounts> {

    public urlSegment: string = "bank_accounts"
    public accessType: ResourceAccessType = ResourceAccessType.Token

    public read (params?: IListParams<PBankAccounts>): Promise<PListResponse<PBankAccount>> {
        return this._read(params)
    }

}
