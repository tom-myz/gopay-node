import { ICRUDResource, CRUDResource } from "../CRUDResource";
import { IParams, URLSegments } from "../Resource";
import { ResourceAccessType } from "../../api/RestAPI";
import { IValidatedResource, ValidationSchema } from "../../validation/Validation";
export interface PTransactionToken<P> {
    id?: string;
    storeId?: string;
    token?: string;
    type?: string;
    data?: P;
    active?: boolean;
    createdOn?: number;
    lastUsedOn?: number;
}
export interface PTokenCard {
    cardholder?: string;
    cardNumber?: string;
    expMonth?: number;
    expYear?: number;
    cvv?: string;
    address?: Object;
    lastFour?: string;
    brand?: string;
}
export interface ParamsTokenRead extends IParams {
    id: string;
}
export interface ParamsTokenCreate extends IParams {
    data: PTransactionToken<any>;
}
export declare class TransactionToken extends CRUDResource<PTransactionToken<any>> implements ICRUDResource<PTransactionToken<any>>, IValidatedResource<PTransactionToken<any>> {
    accessType: ResourceAccessType;
    schemaCreate(data: PTransactionToken<any>): ValidationSchema;
    url(segments: URLSegments): string;
    create(params: ParamsTokenCreate): Promise<PTransactionToken<any>>;
    read(params: ParamsTokenRead): Promise<PTransactionToken<any>>;
    update(params?: any): Promise<any>;
    delete(params: ParamsTokenRead): Promise<any>;
}
