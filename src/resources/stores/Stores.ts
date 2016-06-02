import { IListParams } from "../Resource"
import { IListResource, ListResource, IPaginationParams } from "../ListResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedListResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"
import { MerchantListResource } from "../MerchantListResource"

export interface PStores extends IPaginationParams {}

export interface ParamsListRead<P> extends IListParams<P> {}

export class Stores extends MerchantListResource<PStores> implements IListResource<PStores>, IValidatedListResource<PStores> {

    public urlSegment: string = "stores"

    public accessType: ResourceAccessType = ResourceAccessType.Token

}
