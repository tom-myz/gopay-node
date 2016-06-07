import { IListResource, IPaginationParams } from "../ListResource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedListResource } from "../../validation/Validation";
import { MerchantListResource } from "../MerchantListResource";
import { PStore } from "./Store";
export interface PStores extends IPaginationParams {
}
export declare class Stores extends MerchantListResource<PStores, PStore> implements IListResource<PStore>, IValidatedListResource<PStores> {
    urlSegment: string;
    accessType: ResourceAccessType;
}
