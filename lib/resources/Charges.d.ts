import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction, RestAPI } from "../api/RestAPI";
export interface ChargeCreateParams {
    token: string;
    amount: number;
    currency: string;
    metadata?: Object;
}
export declare class Charges extends CRUDResource {
    static routeBase: string;
    constructor(api: RestAPI);
    list(storeId: string, callback?: SDKCallbackFunction, data?: CRUDPaginationParams, merchantId?: string, token?: string): Promise<any>;
    create(data: ChargeCreateParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    get(storeId: string, id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
}
