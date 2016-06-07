import { MerchantCRUDResource } from "../MerchantCRUDResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"
import { StoreConfiguration } from "./StoreConfiguration"
import { ApplicationToken } from "./ApplicationToken"
import { PGatewayCredentials, gatewayCredentialsSchema } from "../common/GatewayCredentials"

export interface PStore {
    id?: string
    storeConfigurationId?: string
    merchantId?: string
    name?: string
    gatewayCredentials?: PGatewayCredentials
    createdOn?: number
    updatedOn?: number
}

export class Store extends MerchantCRUDResource<PStore> implements IValidatedResource<PStore> {

    /* Related resources */
    public configuration: StoreConfiguration = new StoreConfiguration(this.api)
    public applicationToken: ApplicationToken = new ApplicationToken(this.api)

    public urlSegment: string = "stores"

    public accessType: ResourceAccessType = ResourceAccessType.Token

    public schemaCreate (): ValidationSchema {
        return {
            gatewayCredentials : gatewayCredentialsSchema,
            name               : [ new Validator.Required() ]
        }
    }

    public schemaUpdate (): ValidationSchema {
        return {
            gatewayCredentials : gatewayCredentialsSchema
        }
    }
}
