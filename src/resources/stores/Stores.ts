import { IListParams } from "../Resource"
import { IListResource, ListResource, IPaginationParams } from "../ListResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedListResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"
import { MerchantListResource } from "../MerchantListResource"
import { PStore } from "./Store"

export interface PStores extends IPaginationParams {}

export class Stores extends MerchantListResource<PStores, PStore> implements IListResource<PStore>, IValidatedListResource<PStores> {

    public urlSegment: string = "stores"
    public accessType: ResourceAccessType = ResourceAccessType.Token

}
