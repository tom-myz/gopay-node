import { RestAPI } from "../api/RestAPI";
import { Resource, DefinedRoute } from "./Resource";
export interface CRUDPaginationParams {
    page?: number;
    pageSize?: number;
}
export interface CRUDItemsResponse<A> {
    items: Array<A>;
    total: number;
}
export declare abstract class CRUDResource extends Resource {
    _routeBase: string;
    constructor(api: RestAPI);
    _listRoute(required?: Array<string>): DefinedRoute;
    _createRoute(required?: Array<string>): DefinedRoute;
    _getRoute(required?: Array<string>): DefinedRoute;
    _updateRoute(required?: Array<string>): DefinedRoute;
    _deleteRoute(required?: Array<string>): DefinedRoute;
}
