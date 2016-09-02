import { CRUDResource, CRUDPaginationParams, CRUDDefinedRoute } from "./CRUDResource";
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
    from?: string;
    to: string;
}
export interface TransferUpdateParams extends TransferCommonParams {
}
export interface TransferPendingMerchantParams {
    from?: string;
    to: string;
}
export declare class Transfers extends CRUDResource {
    static routeBase: string;
    _finalizeTransfer: CRUDDefinedRoute;
    _getTransfersPendingMerchants: CRUDDefinedRoute;
    _getMerchantPendingTransfers: CRUDDefinedRoute;
    list(callback?: SDKCallbackFunction, data?: CRUDPaginationParams, merchantId?: string, token?: string): Promise<any>;
    create(data: TransferCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    get(id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    update(id: string, data?: TransferUpdateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    finalizeTransfer(id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    getTransfersPendingMerchants(merchantId: string, callback?: SDKCallbackFunction, data?: TransferPendingMerchantParams, token?: string): Promise<any>;
    getMerchantPendingTransfers(merchantId: string, callback?: SDKCallbackFunction, data?: TransferPendingMerchantParams, token?: string): Promise<any>;
}
