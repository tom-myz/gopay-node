import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export interface LedgerUpdateParams {
    note?: string;
    status?: string;
}
export declare class Ledger extends CRUDResource {
    static routeBase: string;
    list(callback?: SDKCallbackFunction, data?: CRUDPaginationParams, merchantId?: string, storeId?: string, token?: string): Promise<any>;
    update(id: string, data?: LedgerUpdateParams, callback?: SDKCallbackFunction, merchantId?: string, storeId?: string, token?: string): Promise<any>;
}
