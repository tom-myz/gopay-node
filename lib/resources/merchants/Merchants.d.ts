import { IListParams, PListResponse } from "../Resource";
import { IListResource, ListResource, IPaginationParams } from "../ListResource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedListResource } from "../../validation/Validation";
import { PMerchant } from "./Merchant";
export interface PMerchants extends IPaginationParams {
}
export declare class Merchants extends ListResource<PMerchants, PMerchant> implements IListResource<PMerchant>, IValidatedListResource<PMerchants> {
    urlSegment: string;
    accessType: ResourceAccessType;
    read(params?: IListParams<PMerchants>): Promise<PListResponse<PMerchant>>;
}
