import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export declare class ApplicationTokens extends CRUDResource {
    routeBase: string;
    list(storeId: string, data: CRUDPaginationParams, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    create(storeId: string, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
}
