import { IListParams, PListResponse } from "../Resource"
import { IListResource, ListResource, IPaginationParams } from "../ListResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedListResource, ValidationSchema } from "../../validation/Validation"
import { PTransfer } from "./Transfer"

export interface PTransfers extends IPaginationParams {}

export class Transfers extends ListResource<PTransfers, PTransfer> implements IListResource<PTransfers>, IValidatedListResource<PTransfers> {

    public urlSegment: string = "transfers"
    public accessType: ResourceAccessType = ResourceAccessType.Token

    public read (params: IListParams<PTransfers>): Promise<PListResponse<PTransfer>> {
        return this._read(params)
    }

}
