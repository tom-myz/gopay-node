import { MerchantCRUDResource } from "../MerchantCRUDResource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedResource, ValidationSchema } from "../../validation/Validation";
import { StoreConfiguration } from "./StoreConfiguration";
import { ApplicationToken } from "./ApplicationToken";
import { PGatewayCredentials } from "../common/GatewayCredentials";
export interface PStore {
    id?: string;
    storeConfigurationId?: string;
    merchantId?: string;
    name?: string;
    gatewayCredentials?: PGatewayCredentials;
    createdOn?: number;
    updatedOn?: number;
}
export declare class Store extends MerchantCRUDResource<PStore> implements IValidatedResource<PStore> {
    configuration: StoreConfiguration;
    applicationToken: ApplicationToken;
    urlSegment: string;
    accessType: ResourceAccessType;
    schemaCreate(): ValidationSchema;
    schemaUpdate(): ValidationSchema;
}
