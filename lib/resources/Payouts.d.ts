import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export declare class Payouts extends CRUDResource {
    static routeBase: string;
    list(data: CRUDPaginationParams, callback?: SDKCallbackFunction, token?: string): Promise<any>;
}
