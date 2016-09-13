import { RestAPI, HTTPMethod } from "../api/RestAPI"
import { Resource, DefinedRoute } from "./Resource"

export interface CRUDIdParam { id: string }
export interface CRUDMerchantIdParam { merchantId: string }
export interface CRUDStoreIdParam extends CRUDMerchantIdParam { storeId: string }

interface CRUDResourceStatic extends Function {
    routeBase: string
}

export abstract class CRUDResource extends Resource {

    public _listRoute: DefinedRoute
    public _createRoute: DefinedRoute
    public _getRoute: DefinedRoute
    public _updateRoute: DefinedRoute
    public _deleteRoute: DefinedRoute

    constructor (api: RestAPI) {
        super(api)

        const routeBase: string = (this.constructor as CRUDResourceStatic).routeBase

        this._listRoute = this.defineRoute("GET", routeBase)
        this._createRoute = this.defineRoute("POST", routeBase)
        this._getRoute = this.defineRoute("GET", `${routeBase}/:id`)
        this._updateRoute = this.defineRoute("PATCH", `${routeBase}/:id`)
        this._deleteRoute = this.defineRoute("DELETE", `${routeBase}/:id`)
    }

}
