import { IListParams } from "../Resource"
import { IListResource, ListResource, IPaginationParams } from "../ListResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedListResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"

export interface PMerchants extends IPaginationParams {}

export interface ParamsListRead<P> extends IListParams<P> {}

export class Merchants extends ListResource<PMerchants> implements IListResource<PMerchants>, IValidatedListResource<PMerchants> {

    public accessType: ResourceAccessType = ResourceAccessType.Token

    public url (): string {
        return `/merchants`
    }

    public read (params: ParamsListRead<PMerchants>): Promise<PMerchants> {
        return this._read(params)
    }

}
