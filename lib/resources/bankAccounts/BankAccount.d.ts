import { ICRUDResource, CRUDParamsRead, CRUDParamsCreate, CRUDParamsUpdate } from "../CRUDResource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedResource, ValidationSchema } from "../../validation/Validation";
import { MerchantCRUDResource } from "../MerchantCRUDResource";
export interface PBankAccount {
    id?: string;
    holderName?: string;
    bankName?: string;
    branchName?: string;
    country?: string;
    bankAddress?: string;
    currency?: string;
    accountNumber?: string;
    routingNumber?: string;
    swiftCode?: string;
    ifscCode?: string;
    routingCode?: string;
    lastFour?: string;
    isPrimary?: boolean;
    status?: string;
    createdOn?: number;
    updatedOn?: number;
}
export declare class BankAccount extends MerchantCRUDResource<PBankAccount> implements ICRUDResource<PBankAccount>, IValidatedResource<PBankAccount> {
    urlSegment: string;
    accessType: ResourceAccessType;
    schemaCreate(): ValidationSchema;
    create(params: CRUDParamsCreate<PBankAccount>): Promise<PBankAccount>;
    read(params: CRUDParamsRead): Promise<PBankAccount>;
    update(params?: CRUDParamsUpdate<PBankAccount>): Promise<PBankAccount>;
    delete(params?: any): Promise<any>;
}
