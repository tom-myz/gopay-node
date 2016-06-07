import { IListParams, PListResponse } from "../Resource";
import { IListResource, ListResource, IPaginationParams } from "../ListResource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedListResource } from "../../validation/Validation";
import { PPayout } from "./Payout";
export interface PPayouts extends IPaginationParams {
    status?: string;
}
export declare class Payouts extends ListResource<PPayouts, PPayout> implements IListResource<PPayouts>, IValidatedListResource<PPayouts> {
    urlSegment: string;
    accessType: ResourceAccessType;
    read(params?: IListParams<PPayouts>): Promise<PListResponse<PPayout>>;
}
