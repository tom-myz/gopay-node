import { RestAPI, HTTPMethod, ResponseCallback } from "../api/RestAPI"
import { PathParameterError } from "../errors/PathParameterError"
import { RequestParameterError } from "../errors/RequestParameterError"
import { fromError } from "../errors/parser"
import { missingKeys } from "../utils/object"

export type DefinedRoute = (data?: any, callback?: any, pathParams?: Array<string>, ...params: Array<string>) => Promise<any>

export abstract class Resource {

    public api: RestAPI

    constructor (api: RestAPI) {
        this.api = api
    }

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

    public defineRoute (method: HTTPMethod, path: string, required: Array<string> = []): DefinedRoute {
        const api: RestAPI = this.api

        return function route<A, B> (data?: A,
                                     callback?: ResponseCallback<B>,
                                     pathParams: Array<string> = [],
                                     ...params: Array<string>): Promise<B> {

            const _params: any = params.reduce((p: any, param: string, i: number) => {
                if (pathParams && pathParams[i]) {
                    p[pathParams[i]] = param
                }
                return p
            }, {})

            const url: string = Resource.compilePath(path, _params)
            const missingPathParams: Array<string> = (url.match(/:([a-z]+)/ig) || [])
                .map((m: string) => m.replace(":", ""))
            const missingParams: Array<string> = missingKeys(data, required)


            if (missingPathParams.length > 0) {
                return Promise.reject(fromError(new PathParameterError(missingPathParams[0])))
            }

            if (missingParams.length > 0) {
                return Promise.reject(fromError(new RequestParameterError(missingParams[0])))
            }

            return api.send(method, url, data, callback)
        }
    }

}
