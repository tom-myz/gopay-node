import { SDKCallbackFunction } from "../api/RestAPI"
import { WithAPI } from "../api/WithAPI"
import { RestAPI } from "../api/RestAPI"
import { DataValidator } from "../validation/validator"
import { errorFromValidation, SDKError } from "../errors/SDKError"
import { validationCodes } from "../validation/error-codes"
import Validator = ValidatorJS.Validator
import { underscore } from "../utils"

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
    storeId?: string
}

export interface CRUDIdStoreIdParam extends CRUDIdParam, CRUDStoreIdParam {}

export interface CRUDTransferIdParam extends CRUDMerchantIdParam {
    transferId?: string
}

export interface CRUDPaginationParams {
    page?: number
    pageSize?: number
}

export type CRUDDefinedRoute = (pathParams: any, data?: any, callback?: SDKCallbackFunction, options?: CRUDOptionalParams) => Promise<any>

export interface CRUDOptionalParams {
    token?: string
    validationSchema?: any
    payloadType?: string
    [key: string]: any
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

        return function route<P, D> (pathParams: P,
                                     data?: D,
                                     callback?: SDKCallbackFunction,
                                     options?: CRUDOptionalParams): Promise<any> {

            const url: string = CRUDResource.compilePath(path, pathParams)
            const schema: any = options.validationSchema || {}

            let validatorData: any = {}

            if (data instanceof FormData) {
                for (let pair of (data as FormData).entries()) {
                    validatorData[pair[0] as string] = pair[1]
                }
            } else {
                validatorData = data
            }

            const validator: Validator<D> = DataValidator.create(validatorData, schema, validationCodes)
            const cb: SDKCallbackFunction = callback || ((err: SDKError, result: any) => null)

            if (validator.fails()) {
                const errors: any = validator.errors.all()
                const err: SDKError = errorFromValidation(errors)
                cb(err, null)
                return Promise.reject(err)
            }

            function getBody(): any {
                if (data instanceof FormData) {
                    return data
                } else if (typeof data === "object" && ["GET", "DELETE"].indexOf(method) === -1) {
                    return JSON.stringify(underscore(data))
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
