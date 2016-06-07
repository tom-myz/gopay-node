import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedResource, ValidationSchema } from "../../validation/Validation";
import { StoreCRUDResource } from "../StoreCRUDResource";
export interface PStoreConfiguration {
    name?: string;
}
export declare class StoreConfiguration extends StoreCRUDResource<PStoreConfiguration> implements IValidatedResource<PStoreConfiguration> {
    urlSegment: string;
    accessType: ResourceAccessType;
    schemaUpdate(): ValidationSchema;
    create(params?: any): Promise<any>;
    delete(params?: any): Promise<any>;
}
