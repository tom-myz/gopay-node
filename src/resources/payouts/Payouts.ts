import { IListParams, PListResponse } from "../Resource"
import { IListResource, ListResource, IPaginationParams } from "../ListResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedListResource } from "../../validation/Validation"
import { PPayout } from "./Payout"

export interface PPayouts extends IPaginationParams {
    status?: string
}

export class Payouts
    extends ListResource<PPayouts, PPayout>
    implements IListResource<PPayouts>, IValidatedListResource<PPayouts> {

    public urlSegment: string = "payouts"
    public accessType: ResourceAccessType = ResourceAccessType.Token

    public read (params?: IListParams<PPayouts>): Promise<PListResponse<PPayout>> {
        return this._read(params)
    }

}
