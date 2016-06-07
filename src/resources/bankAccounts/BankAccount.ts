import { ICRUDResource, CRUDParamsRead, CRUDParamsCreate, CRUDParamsUpdate } from "../CRUDResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"
import { ACTION_NOT_PERMITTED } from "../../errors/Errors"
import { MerchantCRUDResource } from "../MerchantCRUDResource"

export interface PBankAccount {
    id?: string
    holderName?: string
    bankName?: string
    branchName?: string
    country?: string
    bankAddress?: string
    currency?: string
    accountNumber?: string
    routingNumber?: string
    swiftCode?: string
    ifscCode?: string
    routingCode?: string
    lastFour?: string
    isPrimary?: boolean
    status?: string
    createdOn?: number
    updatedOn?: number
}

export class BankAccount
    extends MerchantCRUDResource<PBankAccount>
    implements ICRUDResource<PBankAccount>, IValidatedResource<PBankAccount> {

    public urlSegment: string = "bank_accounts"
    public accessType: ResourceAccessType = ResourceAccessType.Token

    public schemaCreate (): ValidationSchema {
        return {
            accountNumber : [ new Validator.Required() ],
            bankName      : [ new Validator.Required() ],
            currency      : [ new Validator.Required(), new Validator.LengthMin(3) ],
            holderName    : [ new Validator.Required() ]
        }
    }

    public create (params: CRUDParamsCreate<PBankAccount>): Promise<PBankAccount> {
        return this._create(params)
    }

    public read (params: CRUDParamsRead): Promise<PBankAccount> {
        return this._read(params)
    }

    public update (params?: CRUDParamsUpdate<PBankAccount>): Promise<PBankAccount> {
        return this._update(params)
    }

    public delete (params?: any): Promise<any> {
        return Promise.reject(ACTION_NOT_PERMITTED)
    }

}
