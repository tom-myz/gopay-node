import { ICRUDResource, CRUDResource } from "../CRUDResource"
import {IParams, URLSegments} from "../Resource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"

export interface PMerchant {
    id?: string
    email?: string
    password?: string
    address?: Object
    gatewayCredentials?: Object
    active?: boolean
    roles?: Array<string>
    createdOn?: number
    updatedOn?: number
}

export interface ParamsMerchantRead extends IParams {
    id: string
}

export interface ParamsMerchantCreate extends IParams {
    data: PMerchant
}

export interface ParamsMerchantUpdate extends IParams {
    id: string
    data: PMerchant
}

export class Merchant extends CRUDResource<PMerchant> implements ICRUDResource<PMerchant>, IValidatedResource<PMerchant> {

    public schemaCreate (): ValidationSchema {
        return {
            email    : [ new Validator.Required(), new Validator.Email() ],
            password : [ new Validator.Required(), new Validator.LengthBetween(8, 30) ]
        }

    }

    public schemaUpdate (): ValidationSchema {
        return {
            email : [ new Validator.Email() ]
        }
    }

    public accessType: ResourceAccessType = ResourceAccessType.Token
    
    public url (segments: URLSegments): string {
        return `/merchants${segments.id ? `/${segments.id}` : ""}`
    }

    public create (params: ParamsMerchantCreate): Promise<PMerchant> {
        return this._create(params)
    }

    public read (params: ParamsMerchantRead): Promise<PMerchant> {
        return this._read(params)
    }

    public update (params: ParamsMerchantUpdate): Promise<PMerchant> {
        return this._update(params)
    }

    public delete (params: ParamsMerchantRead): Promise<any> {
        return this._delete(params)
    }
    
}
