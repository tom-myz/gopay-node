import { IListParams, PListResponse } from "../Resource"
import { IListResource, ListResource, IPaginationParams } from "../ListResource"
import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedListResource } from "../../validation/Validation"
import { PMerchant } from "./Merchant"

export interface PMerchants extends IPaginationParams {}

export class Merchants
    extends ListResource<PMerchants, PMerchant>
    implements IListResource<PMerchant>, IValidatedListResource<PMerchants> {

    public urlSegment: string = "merchants"
    public accessType: ResourceAccessType = ResourceAccessType.Token

    public read (params?: IListParams<PMerchants>): Promise<PListResponse<PMerchant>> {
        return this._read(params)
    }

}
