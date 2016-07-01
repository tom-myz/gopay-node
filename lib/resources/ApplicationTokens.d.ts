import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export interface ApplicationTokenParams {
    domains?: Array<string>;
}
export declare class ApplicationTokens extends CRUDResource {
    static routeBase: string;
    list(storeId: string, callback?: SDKCallbackFunction, data?: CRUDPaginationParams, merchantId?: string, token?: string): Promise<any>;
    create(storeId: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    update(storeId: string, id: string, data: ApplicationTokenParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    delete(storeId: string, id: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
}
