import { ICRUDResource, CRUDResource, CRUDParamsCreate, CRUDParamsRead, CRUDParamsUpdate } from "../CRUDResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"
import { ACTION_NOT_PERMITTED } from "../../errors/Errors"

export interface PCharge {
    id?: string
    token?: string
    amount?: number
    currency?: string
    status?: string
    metadata?: Object
    errorCode?: string
    errorText?: string
    createdOn?: number
    updatedOn?: number
}

export class Charge extends CRUDResource<PCharge> implements ICRUDResource<PCharge>, IValidatedResource<PCharge> {

    public urlSegment: string = "charges"
    public accessType: ResourceAccessType = ResourceAccessType.Token

    public schemaCreate (): ValidationSchema {
        return {
            amount   : [ new Validator.Required(), new Validator.Numeric() ],
            currency : [ new Validator.Required(), new Validator.LengthMin(3) ],
            token    : [ new Validator.Required() ]
        }
    }

    public create (params: CRUDParamsCreate<PCharge>): Promise<PCharge> {
        return this._create(params)
    }

    public read (params: CRUDParamsRead): Promise<PCharge> {
        return this._read(params)
    }

    public update (params: CRUDParamsUpdate<PCharge>): Promise<PCharge> {
        return this._update(params)
    }

    public delete (params?: any): Promise<any> {
        return Promise.reject(ACTION_NOT_PERMITTED)
    }

}
