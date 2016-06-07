import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"
import { StoreCRUDResource } from "../StoreCRUDResource"
import { ACTION_NOT_PERMITTED } from "../../errors/Errors"

export interface PStoreConfiguration {
    name?: string
}

export class StoreConfiguration extends StoreCRUDResource<PStoreConfiguration> implements IValidatedResource<PStoreConfiguration> {

    public urlSegment: string = "configuration"

    public accessType: ResourceAccessType = ResourceAccessType.Token

    public schemaUpdate (): ValidationSchema {
        return {
            domains      : [ new Validator.List() ],
            paymentTypes : [ new Validator.List() ]
        }
    }

    public create (params?: any): Promise<any> {
        return Promise.reject(ACTION_NOT_PERMITTED)
    }

    public delete (params?: any): Promise<any> {
        return Promise.reject(ACTION_NOT_PERMITTED)
    }

}
