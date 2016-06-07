import { IListParams, PListResponse } from "../Resource";
import { IListResource, IPaginationParams } from "../ListResource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedListResource } from "../../validation/Validation";
import { PTransfer } from "./Transfer";
import { MerchantListResource } from "../MerchantListResource";
export interface PTransfers extends IPaginationParams {
}
export declare class Transfers extends MerchantListResource<PTransfers, PTransfer> implements IListResource<PTransfers>, IValidatedListResource<PTransfers> {
    urlSegment: string;
    accessType: ResourceAccessType;
    read(params?: IListParams<PTransfers>): Promise<PListResponse<PTransfer>>;
}
