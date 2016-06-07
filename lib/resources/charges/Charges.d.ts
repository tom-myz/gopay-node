import { IListParams, PListResponse } from "../Resource";
import { IListResource, ListResource, IPaginationParams } from "../ListResource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedListResource } from "../../validation/Validation";
import { PCharge } from "./Charge";
export interface PCharges extends IPaginationParams {
}
export declare class Charges extends ListResource<PCharges, PCharge> implements IListResource<PCharge>, IValidatedListResource<PCharges> {
    urlSegment: string;
    accessType: ResourceAccessType;
    read(params?: IListParams<PCharges>): Promise<PListResponse<PCharge>>;
}
