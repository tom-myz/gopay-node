import superagent = require("superagent")
import { SDKCallbackFunction } from "../api/RestAPI"
import { WithAPI } from "../api/WithAPI"
import Validator = require("validatorjs")
import { errorFromValidation } from "../errors/SDKError"

export interface PathParams { [key: string]: (string | number) }

export type CRUDMethod = "GET" | "POST" | "UPDATE" | "PATCH" | "DELETE"

export interface CRUDIdParam {
    id: string
}

export interface CRUDMerchantIdParam {
    merchantId?: string
}

export interface CRUDIdMerchantIdParam extends CRUDIdParam, CRUDMerchantIdParam {}

export interface CRUDStoreIdParam extends CRUDMerchantIdParam {
    storeId: string
}

export interface CRUDIdStoreIdParam extends CRUDIdParam, CRUDStoreIdParam {}

export interface CRUDPaginationParams {
    page?: number
    pageSize?: number
}

export type CRUDDefinedRoute = (pathParams: any, data?: any, callback?: SDKCallbackFunction, options?: CRUDOptionalParams) => Promise<any>

export interface CRUDOptionalParams {
    token?: string
    validationSchema?: any
    [key: string]: any
}

export abstract class CRUDResource extends WithAPI {
    
    public validationRules: any
    public routeBase: string

    public _listRoute: CRUDDefinedRoute = this.defineRoute("GET", this.routeBase)
    public _createRoute: CRUDDefinedRoute = this.defineRoute("POST", this.routeBase)
    public _getRoute: CRUDDefinedRoute = this.defineRoute("GET", `${this.routeBase}/:id`)
    public _updateRoute: CRUDDefinedRoute = this.defineRoute("PATCH", `${this.routeBase}/:id`)
    public _deleteRoute: CRUDDefinedRoute = this.defineRoute("DELETE", `${this.routeBase}/:id`)

    static compilePath<P> (path: string, pathParams: P): string {
        return path
            .replace(/\((\w|:|\/)+\)/ig, (o: string) => {
                const part: string = o.replace(/:(\w+)/ig, (s: string, p: string) => {
                    return (pathParams as any)[p] || s
                })
                return part.indexOf(":") === -1 ? part.replace(/\(|\)/g, "") : ""
            })
            .replace(/:(\w+)/ig, (_: string, p: string) => (pathParams as any)[p])
    }

    public defineRoute (method: CRUDMethod, path: string): CRUDDefinedRoute {
        const api = this.api
        const defaultOptions: CRUDOptionalParams = {} as CRUDOptionalParams

        return function route<P, D> (pathParams: P,
                                     data?: D,
                                     callback: SDKCallbackFunction = (err, result) => {},
                                     options: CRUDOptionalParams = defaultOptions): Promise<any> {

            const url: string = CRUDResource.compilePath(path, pathParams)
            const req: superagent.Request<any> = (superagent as any)[(method as string).toLowerCase()](url)
            const schema = options.validationSchema || {}
            const validator: Validator = new Validator(data, schema)
            
            if (validator.fails()) {
                const errors = validator.errors.all()
                const err = errorFromValidation(errors)
                callback(err, null)
                return Promise.reject(err)
            }

            return api.send(
                ["GET", "DELETE"].indexOf(method) !== -1 ? req.query(data) : req.send(data),
                callback,
                options.token
            )
        }
    }

    public validate () {}

}
