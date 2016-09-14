import * as FormData from "form-data"
import { RestAPI, HTTPMethod, ResponseCallback } from "../api/RestAPI"
import { PathParameterError } from "../errors/PathParameterError"
import { RequestParameterError } from "../errors/RequestParameterError"
import { missingKeys } from "../utils/object"

export type DefinedRoute = (pathParams: any, data?: any, callback?: any) => Promise<any>

export abstract class Resource {

    public api: RestAPI

    public static compilePath (path: string, pathParams: any): string {
        return path
            .replace(/\((\w|:|\/)+\)/ig, (o: string) => {
                const part: string = o.replace(/:(\w+)/ig, (s: string, p: string) => {
                    return (pathParams as any)[p] || s
                })
                return part.indexOf(":") === -1 ? part.replace(/\(|\)/g, "") : ""
            })
            .replace(/:(\w+)/ig, (s: string, p: string) => (pathParams as any)[p] || s)
    }

    constructor (api: RestAPI) {
        this.api = api
    }

    public defineRoute (method: HTTPMethod, path: string, pathParams?: Array<string>, required?: Array<string>): DefinedRoute {
        const api: RestAPI = this.api

        return function route<A, B, C> (params: A,
                                        data?: B,
                                        callback?: ResponseCallback<C>): Promise<C> {

            const url: string = Resource.compilePath(path, params)
            const missingPathParams: Array<string> = (url.match(/:([a-z]+)/ig) || []).map((m) => m.replace(":", ""))

            if (missingPathParams.length > 0) {
                Promise.reject(new PathParameterError(missingPathParams[0]))
            }

            if (!(!!data && data.constructor === FormData) && typeof data === "object") {
                const missingParams: Array<string> = missingKeys(data, required)
                if (missingParams.length > 0) {
                    Promise.reject(new PathParameterError(missingParams[0]))
                }
            }
            
            return api.send(method, url, data, callback)
        }
    }

}
