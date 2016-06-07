import { ICRUDResource, CRUDResource, CRUDParamsCreate, CRUDParamsRead, CRUDParamsUpdate } from "../CRUDResource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedResource, ValidationSchema } from "../../validation/Validation";
export interface PCharge {
    id?: string;
    token?: string;
    amount?: number;
    currency?: string;
    status?: string;
    metadata?: Object;
    errorCode?: string;
    errorText?: string;
    createdOn?: number;
    updatedOn?: number;
}
export declare class Charge extends CRUDResource<PCharge> implements ICRUDResource<PCharge>, IValidatedResource<PCharge> {
    urlSegment: string;
    accessType: ResourceAccessType;
    schemaCreate(): ValidationSchema;
    create(params: CRUDParamsCreate<PCharge>): Promise<PCharge>;
    read(params: CRUDParamsRead): Promise<PCharge>;
    update(params: CRUDParamsUpdate<PCharge>): Promise<PCharge>;
    delete(params?: any): Promise<any>;
}
