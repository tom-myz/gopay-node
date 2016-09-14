import { RestAPI } from "../api/RestAPI";
import { Resource, DefinedRoute } from "./Resource";
export interface CRUDIdParam {
    id?: string;
}
export interface CRUDMerchantIdParam {
    merchantId?: string;
}
export interface CRUDStoreIdParam extends CRUDMerchantIdParam {
    storeId?: string;
}
export interface CRUDPaginationParams {
    page?: number;
    pageSize?: number;
}
export interface CRUDItemsResponse<A> {
    items: A;
    total: number;
}
export declare abstract class CRUDResource extends Resource {
    _routeBase: string;
    constructor(api: RestAPI);
    _listRoute(pathParams?: Array<string>, required?: Array<string>): DefinedRoute;
    _createRoute(pathParams?: Array<string>, required?: Array<string>): DefinedRoute;
    _getRoute(pathParams?: Array<string>, required?: Array<string>): DefinedRoute;
    _updateRoute(pathParams?: Array<string>, required?: Array<string>): DefinedRoute;
    _deleteRoute(pathParams?: Array<string>, required?: Array<string>): DefinedRoute;
}
