import { ICRUDResource, CRUDResource, CRUDParamsRead, CRUDParamsCreate, CRUDParamsUpdate } from "../CRUDResource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedResource, ValidationSchema } from "../../validation/Validation";
import { PContactInfo } from "../common/ContactInfo";
import { PGatewayCredentials } from "../common/GatewayCredentials";
export interface PMerchant {
    id?: string;
    email?: string;
    password?: string;
    address?: PContactInfo;
    gatewayCredentials?: PGatewayCredentials;
    active?: boolean;
    roles?: Array<string>;
    createdOn?: number;
    updatedOn?: number;
}
export declare class Merchant extends CRUDResource<PMerchant> implements ICRUDResource<PMerchant>, IValidatedResource<PMerchant> {
    urlSegment: string;
    accessType: ResourceAccessType;
    schemaCreate(): ValidationSchema;
    schemaUpdate(): ValidationSchema;
    create(params: CRUDParamsCreate<PMerchant>): Promise<PMerchant>;
    read(params: CRUDParamsRead): Promise<PMerchant>;
    update(params: CRUDParamsUpdate<PMerchant>): Promise<PMerchant>;
    delete(params: CRUDParamsRead): Promise<any>;
}
