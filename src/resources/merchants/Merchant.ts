import { ICRUDResource, CRUDResource } from "../CRUDResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"

export interface PMerchant {
    email?: string
    password?: string
    createdOn?: number
}

export class Merchant extends CRUDResource<PMerchant> implements ICRUDResource<PMerchant>, IValidatedResource {

    public schemaCreate: ValidationSchema = {
        email    : [ new Validator.Required() ],
        password : [ new Validator.Required() ]
    }

    public schemaUpdate: ValidationSchema

    public accessType: ResourceAccessType = ResourceAccessType.Token
    
    public url (id?: string): string {
        return `/merchants${id ? `/${id}` : ""}`
    }

    public create (data: PMerchant): Promise<PMerchant> {
        return this._create(data)
    }

    public read (id: string): Promise<PMerchant> {
        return this._read(id)
    }

    public update (id: string, data: PMerchant): Promise<PMerchant> {
        return this._update(id, data)
    }

    public delete (id: string): Promise<PMerchant> {
        return this._delete(id)
    }
    
}
