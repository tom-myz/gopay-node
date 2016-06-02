import { IListParams } from "../Resource"
import { IListResource, ListResource, IPaginationParams } from "../ListResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedListResource, ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"

export interface PCharges extends IPaginationParams {}

export interface ParamsListRead<P> extends IListParams<P> {}

export class Charges extends ListResource<PCharges> implements IListResource<PCharges>, IValidatedListResource<PCharges> {

    public accessType: ResourceAccessType = ResourceAccessType.Token

    public url (): string {
        return `/charges`
    }

    public read (params: ParamsListRead<PCharges>): Promise<PCharges> {
        return this._read(params)
    }

}
