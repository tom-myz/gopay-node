import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export interface LedgerUpdateParams {
    note?: string;
    status?: string;
}
export declare class Ledger extends CRUDResource {
    static routeBase: string;
    list(callback?: SDKCallbackFunction, data?: CRUDPaginationParams, token?: string): Promise<any>;
    update(id: string, data?: LedgerUpdateParams, callback?: SDKCallbackFunction, token?: string): Promise<any>;
}
