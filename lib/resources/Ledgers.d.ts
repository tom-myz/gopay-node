import { CRUDResource, CRUDPaginationParams, CRUDDefinedRoute } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export interface LedgerUpdateParams {
    note?: string;
    status?: string;
}
export interface LedgerCreateForTransferParams {
    amount: number;
    currency: string;
    note?: string;
}
export interface LedgerBalanceParams {
    currency?: string;
}
export declare class Ledgers extends CRUDResource {
    static routeBase: string;
    _createLedgerForTransfer: CRUDDefinedRoute;
    _getBalance: CRUDDefinedRoute;
    list(callback?: SDKCallbackFunction, data?: CRUDPaginationParams, merchantId?: string, storeId?: string, token?: string): Promise<any>;
    update(id: string, data?: LedgerUpdateParams, callback?: SDKCallbackFunction, merchantId?: string, storeId?: string, token?: string): Promise<any>;
    createLedgerForTransfer(data: LedgerCreateForTransferParams, callback?: SDKCallbackFunction, merchantId?: string, transferId?: string, token?: string): Promise<any>;
    getBalance(callback?: SDKCallbackFunction, data?: LedgerBalanceParams, id?: string, storeId?: string, token?: string): Promise<any>;
}
