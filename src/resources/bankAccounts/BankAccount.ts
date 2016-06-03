import { ICRUDResource, CRUDResource, CRUDParamsRead, CRUDParamsCreate, CRUDParamsUpdate } from "../CRUDResource"
import {IParams, URLSegments} from "../Resource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"
import { ACTION_NOT_PERMITTED } from "../../errors/Errors"

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

export class BankAccount extends CRUDResource<PBankAccount> implements ICRUDResource<PBankAccount>, IValidatedResource<PBankAccount> {

    public urlSegment: string = "bank_accounts"
    public accessType: ResourceAccessType = ResourceAccessType.Token

    public schemaCreate (): ValidationSchema {
        return {
            holderName    : [ new Validator.Required() ],
            bankName      : [ new Validator.Required() ],
            currency      : [ new Validator.Required() ],
            accountNumber : [ new Validator.Required() ]
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
