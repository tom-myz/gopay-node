import { ICRUDResource, CRUDResource, CRUDParamsRead, CRUDParamsCreate, CRUDParamsUpdate } from "../CRUDResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"
import { PContactInfo, contactInfoSchema } from "../common/ContactInfo"
import { PGatewayCredentials, gatewayCredentialsSchema } from "../common/GatewayCredentials"

export interface PMerchant {
    id?: string
    email?: string
    password?: string
    address?: PContactInfo
    gatewayCredentials?: PGatewayCredentials
    active?: boolean
    roles?: Array<string>
    createdOn?: number
    updatedOn?: number
}

export class Merchant
    extends CRUDResource<PMerchant>
    implements ICRUDResource<PMerchant>, IValidatedResource<PMerchant> {

    public urlSegment: string = "merchants"
    public accessType: ResourceAccessType = ResourceAccessType.Token

    public schemaCreate (): ValidationSchema {
        return {
            address            : contactInfoSchema,
            email              : [ new Validator.Required(), new Validator.Email() ],
            gatewayCredentials : gatewayCredentialsSchema,
            password           : [ new Validator.Required(), new Validator.LengthBetween(8, 30) ]
        }
    }

    public schemaUpdate (): ValidationSchema {
        return {
            address            : contactInfoSchema,
            email              : [ new Validator.Email() ],
            gatewayCredentials : gatewayCredentialsSchema
        }
    }

    public create (params: CRUDParamsCreate<PMerchant>): Promise<PMerchant> {
        return this._create(params)
    }

    public read (params: CRUDParamsRead): Promise<PMerchant> {
        return this._read(params)
    }

    public update (params: CRUDParamsUpdate<PMerchant>): Promise<PMerchant> {
        return this._update(params)
    }

    public delete (params: CRUDParamsRead): Promise<any> {
        return this._delete(params)
    }

}
