import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedResource } from "../../validation/Validation";
import { StoreCRUDResource } from "../StoreCRUDResource";
export interface PApplicationToken {
    id?: string;
    token?: string;
    secret?: string;
}
export declare class ApplicationToken extends StoreCRUDResource<PApplicationToken> implements IValidatedResource<PApplicationToken> {
    single: boolean;
    urlSegment: string;
    accessType: ResourceAccessType;
    read(params?: any): Promise<any>;
    update(params?: any): Promise<any>;
}
