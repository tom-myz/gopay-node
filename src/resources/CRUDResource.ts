import superagent = require("superagent")
import { SDKCallbackFunction } from "../api/RestAPI"
import { WithAPI } from "../api/WithAPI"
import { RestAPI } from "../api/RestAPI"
import { DataValidator } from "../validation/validator"
import Validator = require("validatorjs")
import {errorFromValidation, SDKError} from "../errors/SDKError"
import { validationCodes } from "../validation/error-codes"

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

const methodsMap: any = {
    "GET"    : "get",
    "POST"   : "post",
    "PUT"    : "put",
    "PATCH"  : "patch",
    "DELETE" : "del"
}

interface CRUDResourceStatic extends Function {
    routeBase: string
}

export abstract class CRUDResource extends WithAPI {

    public validationRules: any

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
        const defaultOptions: CRUDOptionalParams = {} as CRUDOptionalParams

        return function route<P, D> (pathParams: P,
                                     data?: D,
                                     callback?: SDKCallbackFunction,
                                     options: CRUDOptionalParams = defaultOptions): Promise<any> {

            const url: string = CRUDResource.compilePath(path, pathParams)
            const req: superagent.Request<any> = (superagent as any)[(methodsMap as any)[(method as string)]](url)
            const schema: any = options.validationSchema || {}
            const validator: Validator = DataValidator.create(data || {}, schema, validationCodes)
            const cb: SDKCallbackFunction = callback || ((err: SDKError, result: any) => null)

            if (validator.fails()) {
                const errors: any = validator.errors.all()
                const err: SDKError = errorFromValidation(errors)
                cb(err, null)
                return Promise.reject(err)
            }

            return api.send(
                ["GET", "DELETE"].indexOf(method) !== -1 ? req.query(data) : req.send(data),
                cb,
                options.token
            )
        }
    }

}
