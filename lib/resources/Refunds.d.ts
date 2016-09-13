import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export interface RefundCreateParams {
}
export declare class Refunds extends CRUDResource {
    static routeBase: string;
    list(chargeId: string, storeId: string, data?: CRUDPaginationParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    create(chargeId: string, storeId: string, data: RefundCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    get(chargeId: string, storeId: string, id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
}
