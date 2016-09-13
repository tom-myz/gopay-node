import { RestAPI } from "../api/RestAPI";
import { Resource, DefinedRoute } from "./Resource";
export interface CRUDIdParam {
    id: string;
}
export interface CRUDMerchantIdParam {
    merchantId: string;
}
export interface CRUDStoreIdParam extends CRUDMerchantIdParam {
    storeId: string;
}
export declare abstract class CRUDResource extends Resource {
    _listRoute: DefinedRoute;
    _createRoute: DefinedRoute;
    _getRoute: DefinedRoute;
    _updateRoute: DefinedRoute;
    _deleteRoute: DefinedRoute;
    constructor(api: RestAPI);
}
