import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export interface TransferCommonParams {
    bankAccountId?: string;
    amount?: number;
    currency?: string;
    status?: string;
    daysPrior?: number;
    metadata?: Object;
}
export interface TransferCreateParams extends TransferCommonParams {
    daysPrior: number;
}
export interface TransferUpdateParams extends TransferCommonParams {
}
export declare class Transfers extends CRUDResource {
    static routeBase: string;
    list(data: CRUDPaginationParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    create(data: TransferCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    get(id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    update(id: string, data?: TransferUpdateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
}
