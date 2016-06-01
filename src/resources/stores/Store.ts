import { ICRUDResource, CRUDResource } from "../CRUDResource"
import { MerchantCRUDResource } from "../MerchantCRUDResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { isEmpty } from "../../utils"
import { IValidatedResource, ValidationSchema } from "../../validation/Validation"

export interface PStore {
    name?: string
}

export class Store extends MerchantCRUDResource<PStore> implements IValidatedResource {

    public urlSegment: string = "stores"

    public schemaCreate: ValidationSchema
    public schemaUpdate: ValidationSchema

    public accessType: ResourceAccessType = ResourceAccessType.Token

}
