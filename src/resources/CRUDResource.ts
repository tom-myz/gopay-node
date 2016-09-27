import { RestAPI } from "../api/RestAPI"
import { Resource, DefinedRoute } from "./Resource"

/* Request */
export interface CRUDPaginationParams {
    page?: number
    pageSize?: number
}

/* Response */
export interface CRUDItemsResponse<A> {
    items: A
    total: number
}

interface CRUDResourceStatic extends Function {
    routeBase: string
}

export abstract class CRUDResource extends Resource {

    public _routeBase: string

    constructor (api: RestAPI) {
        super(api)
        this._routeBase = (this.constructor as CRUDResourceStatic).routeBase
    }

    public _listRoute (required?: Array<string>): DefinedRoute {
        return this.defineRoute("GET", this._routeBase, required)
    }

    public _createRoute (required?: Array<string>): DefinedRoute {
        return this.defineRoute("POST", this._routeBase, required)
    }

    public _getRoute (required?: Array<string>): DefinedRoute {
        return this.defineRoute("GET", `${this._routeBase}/:id`, required)
    }

    public _updateRoute (required?: Array<string>): DefinedRoute {
        return this.defineRoute("PATCH", `${this._routeBase}/:id`, required)
    }

    public _deleteRoute (required?: Array<string>): DefinedRoute {
        return this.defineRoute("DELETE", `${this._routeBase}/:id`, required)
    }

}
