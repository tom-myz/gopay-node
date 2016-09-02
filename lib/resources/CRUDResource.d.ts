import { SDKCallbackFunction } from "../api/RestAPI";
import { WithAPI } from "../api/WithAPI";
import { RestAPI } from "../api/RestAPI";
export interface PathParams {
    [key: string]: (string | number);
}
export declare type CRUDMethod = "GET" | "POST" | "UPDATE" | "PATCH" | "DELETE";
export interface CRUDIdParam {
    id: string;
}
export interface CRUDMerchantIdParam {
    merchantId?: string;
}
export interface CRUDIdMerchantIdParam extends CRUDIdParam, CRUDMerchantIdParam {
}
export interface CRUDStoreIdParam extends CRUDMerchantIdParam {
    storeId?: string;
}
export interface CRUDIdStoreIdParam extends CRUDIdParam, CRUDStoreIdParam {
}
export interface CRUDTransferIdParam extends CRUDMerchantIdParam {
    transferId?: string;
}
export interface CRUDPaginationParams {
    page?: number;
    pageSize?: number;
}
export declare type CRUDDefinedRoute = (pathParams: any, data?: any, callback?: SDKCallbackFunction, options?: CRUDOptionalParams) => Promise<any>;
export interface CRUDOptionalParams {
    token?: string;
    validationSchema?: any;
    [key: string]: any;
}
export declare abstract class CRUDResource extends WithAPI {
    validationRules: any;
    _listRoute: CRUDDefinedRoute;
    _createRoute: CRUDDefinedRoute;
    _getRoute: CRUDDefinedRoute;
    _updateRoute: CRUDDefinedRoute;
    _deleteRoute: CRUDDefinedRoute;
    constructor(api: RestAPI);
    static compilePath<P>(path: string, pathParams: P): string;
    defineRoute(method: CRUDMethod, path: string): CRUDDefinedRoute;
}
