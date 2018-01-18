import { RestAPI, HTTPMethod } from "../api/RestAPI"
import { Resource, DefinedRoute } from "./Resource"

export const enum CursorDirection {
    ASC  = "asc",
    DESC = "desc"
}

/* Request */
export interface CRUDPaginationParams {
    limit?: number
    cursor?: string
    cursorDirection?: CursorDirection
}

/* Response */
export interface CRUDItemsResponse<A> {
    items: Array<A>
    hasMore: boolean
}

interface CRUDResourceStatic extends Function {
    routeBase: string
}

export abstract class CRUDResource extends Resource {

    public _routeBase: string

    constructor(api: RestAPI) {
        super(api)
        this._routeBase = (this.constructor as CRUDResourceStatic).routeBase
    }

    public _listRoute(required?: Array<string>): DefinedRoute {
        return this.defineRoute(HTTPMethod.GET, this._routeBase, required)
    }

    public _createRoute(required?: Array<string>): DefinedRoute {
        return this.defineRoute(HTTPMethod.POST, this._routeBase, required)
    }

    public _getRoute(required?: Array<string>): DefinedRoute {
        return this.defineRoute(HTTPMethod.GET, `${this._routeBase}/:id`, required)
    }

    public _updateRoute(required?: Array<string>): DefinedRoute {
        return this.defineRoute(HTTPMethod.PATCH, `${this._routeBase}/:id`, required)
    }

    public _deleteRoute(required?: Array<string>): DefinedRoute {
        return this.defineRoute(HTTPMethod.DELETE, `${this._routeBase}/:id`, required)
    }

}
