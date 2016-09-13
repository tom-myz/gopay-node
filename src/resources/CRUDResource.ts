import { SDKCallbackFunction } from "../api/RestAPI"
import { WithAPI } from "../api/WithAPI"
import { RestAPI } from "../api/RestAPI"
import { errorFromValidation, SDKError } from "../errors/SDKError"

export interface PathParams { [key: string]: (string | number) }

export type CRUDMethod = "GET" | "POST" | "PATCH" | "DELETE"

export interface CRUDIdParam { id: string }
export interface CRUDMerchantIdParam { merchantId: string }
export interface CRUDStoreIdParam extends CRUDMerchantIdParam { storeId: string }

export interface CRUDPaginationParams {
    page?: number
    pageSize?: number
}

export interface CRUDOptionalParams {
    token?: string
    validationSchema?: any
    payloadType?: string
    [key: string]: any
}

export type CRUDDefinedRoute = (pathParams: any, data?: any, callback?: SDKCallbackFunction, options?: CRUDOptionalParams) => Promise<any>

interface CRUDResourceStatic extends Function {
    routeBase: string
}



export abstract class CRUDResource extends WithAPI {

    public _listRoute: CRUDDefinedRoute
    public _createRoute: CRUDDefinedRoute
    public _getRoute: CRUDDefinedRoute
    public _updateRoute: CRUDDefinedRoute
    public _deleteRoute: CRUDDefinedRoute

    constructor (api: RestAPI) {
        super(api)

        const routeBase: string = (this.constructor as CRUDResourceStatic).routeBase

        this._listRoute = this.defineRoute("GET", routeBase)
        this._createRoute = this.defineRoute("POST", routeBase)
        this._getRoute = this.defineRoute("GET", `${routeBase}/:id`)
        this._updateRoute = this.defineRoute("PATCH", `${routeBase}/:id`)
        this._deleteRoute = this.defineRoute("DELETE", `${routeBase}/:id`)
    }

    public static compilePath<P> (path: string, pathParams: P): string {
        return path
            .replace(/\((\w|:|\/)+\)/ig, (o: string) => {
                const part: string = o.replace(/:(\w+)/ig, (s: string, p: string) => {
                    return (pathParams as any)[p] || s
                })
                return part.indexOf(":") === -1 ? part.replace(/\(|\)/g, "") : ""
            })
            .replace(/:(\w+)/ig, (s: string, p: string) => (pathParams as any)[p] || s)
    }

    public defineRoute (method: CRUDMethod, path: string): CRUDDefinedRoute {
        const api: RestAPI = this.api

        return function route<P, D> (pathParams: P,
                                     data?: D,
                                     callback?: SDKCallbackFunction,
                                     options?: CRUDOptionalParams): Promise<any> {

            const url: string = CRUDResource.compilePath(path, pathParams)

            const cb: SDKCallbackFunction = callback || ((err: SDKError, result: any) => null)

            function getBody(): any {
                if (data instanceof FormData) {
                    return data
                } else if (typeof data === "object" && ["GET", "DELETE"].indexOf(method) === -1) {
                    return JSON.stringify(data)
                }
                return null
            }

            function getUrl(_url: string): string {
                let queryString: string

                if (["GET", "DELETE"].indexOf(method) !== -1) {
                    queryString = Object.keys(data || {})
                        .map((k: string) => `${encodeURIComponent(k)}=${encodeURIComponent((data as any)[k])}`)
                        .join("&")
                }
                return queryString ? `${_url}?${queryString}` : _url
            }

            return api.send(
                { body : getBody(), method, url : getUrl(url) },
                cb,
                options
            )
        }
    }

}
