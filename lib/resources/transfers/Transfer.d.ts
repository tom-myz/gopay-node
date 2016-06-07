import { ICRUDResource, CRUDParamsRead, CRUDParamsCreate } from "../CRUDResource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedResource, ValidationSchema } from "../../validation/Validation";
import { MerchantCRUDResource } from "../MerchantCRUDResource";
export interface PTransfer {
    id?: string;
    merchantId?: string;
    bankAccountId?: string;
    amount?: number;
    currency?: string;
    status?: string;
    daysPrior?: number;
    metadata?: Object;
    createdOn?: number;
    updatedOn?: number;
}
export declare class Transfer extends MerchantCRUDResource<PTransfer> implements ICRUDResource<PTransfer>, IValidatedResource<PTransfer> {
    urlSegment: string;
    accessType: ResourceAccessType;
    schemaCreate(): ValidationSchema;
    create(params: CRUDParamsCreate<PTransfer>): Promise<PTransfer>;
    read(params: CRUDParamsRead): Promise<PTransfer>;
    update(params?: any): Promise<any>;
    delete(params?: any): Promise<any>;
}
