import { ICRUDResource, CRUDResource } from "../CRUDResource"
import {IParams, URLSegments} from "../Resource"
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

export interface ParamsChargeRead extends IParams {
    id: string
}

export interface ParamsChargeCreate extends IParams {
    data: PCharge
}

export interface ParamsChargeUpdate extends IParams {
    id: string
    data: PCharge
}

export class Charge extends CRUDResource<PCharge> implements ICRUDResource<PCharge>, IValidatedResource<PCharge> {

    public schemaCreate (): ValidationSchema {
        return {
            token    : [ new Validator.Required() ],
            amount   : [ new Validator.Required(), new Validator.Numeric() ],
            currency : [ new Validator.Required() ]
        }

    }

    public accessType: ResourceAccessType = ResourceAccessType.Token

    public url (segments: URLSegments): string {
        return `/charges${segments.id ? `/${segments.id}` : ""}`
    }

    public create (params: ParamsChargeCreate): Promise<PCharge> {
        return this._create(params)
    }

    public read (params: ParamsChargeRead): Promise<PCharge> {
        return this._read(params)
    }

    public update (params: ParamsChargeUpdate): Promise<PCharge> {
        return this._update(params)
    }

    public delete (params: any): Promise<any> {
        return Promise.reject(ACTION_NOT_PERMITTED)
    }

}
