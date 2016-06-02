import { ICRUDResource, CRUDResource } from "../CRUDResource"
import { MerchantCRUDResource } from "../MerchantCRUDResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { isEmpty } from "../../utils"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"
import { StoreConfiguration } from "./StoreConfiguration"
import { ApplicationToken } from "./ApplicationToken"

export interface PStore {
    id?: string
    name?: string
}

export class Store extends MerchantCRUDResource<PStore> implements IValidatedResource<PStore> {

    /* Related resources */
    public configuration: StoreConfiguration = new StoreConfiguration(this.api)
    public applicationToken: ApplicationToken = new ApplicationToken(this.api)

    public urlSegment: string = "stores"

    public schemaCreate (): ValidationSchema {
        return {
            name : [ new Validator.Required() ]
        }
    }

    public accessType: ResourceAccessType = ResourceAccessType.Token

}
