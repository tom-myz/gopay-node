import { ICRUDResource, CRUDResource } from "../CRUDResource"
import {IParams, URLSegments} from "../Resource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"
import { ACTION_NOT_PERMITTED } from "../../errors/Errors"

export interface PTransactionToken<P> {
    id?: string
    storeId?: string
    token?: string
    type?: string
    data?: P
    active?: boolean
    createdOn?: number
    lastUsedOn?: number
}

export interface PTokenCard {
    cardholder?: string
    cardNumber?: string
    expMonth?: number
    expYear?: number
    cvv?: string
    address?: Object
    lastFour?: string
    brand?: string
}

const TokenCardSchema: ValidationSchema = {
    cardNumber : [ new Validator.Required(), new Validator.CardNumber() ],
    expMonth : [ new Validator.Required(), new Validator.Numeric() ],
    expYear : [ new Validator.Required(), new Validator.Numeric() ],
    cvv : [ new Validator.Required(), new Validator.Numeric() ]
}

export interface ParamsTokenRead extends IParams {
    id: string
}

export interface ParamsTokenCreate extends IParams {
    data: PTransactionToken<any>
}

export class TransactionToken extends CRUDResource<PTransactionToken<any>> implements ICRUDResource<PTransactionToken<any>>, IValidatedResource<PTransactionToken<any>> {

    public schemaCreate (data: PTransactionToken<any>): ValidationSchema {
        const schema: ValidationSchema = {
            type : [ new Validator.Required() ],
            storeId : [ new Validator.Required(), new Validator.UUID() ]
        }

        switch (data.type) {
            case "card" :
                (<any>schema)["data"] = TokenCardSchema
                break

            default:
        }

        return schema
    }

    public accessType: ResourceAccessType = ResourceAccessType.Token

    public url (segments: URLSegments): string {
        return `/tokens${segments.id ? `/${segments.id}` : ""}`
    }

    public create (params: ParamsTokenCreate): Promise<PTransactionToken<any>> {
        return this._create(params)
    }

    public read (params: ParamsTokenRead): Promise<PTransactionToken<any>> {
        return this._read(params)
    }

    public update (params: any): Promise<any> {
        return Promise.reject(ACTION_NOT_PERMITTED)
    }

    public delete (params: ParamsTokenRead): Promise<any> {
        return this._delete(params)
    }

}
