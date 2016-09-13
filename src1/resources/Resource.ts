import { RestAPI, HTTPMethod } from "../api/RestAPI"

export type DefinedRoute = (pathParams: any, data?: any, callback?: any, options?: any) => Promise<any>

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

    public defineRoute (method: HTTPMethod, path: string, ): DefinedRoute {
        const api: RestAPI = this.api

        return function route<P, D> (pathParams: P,
                                     data?: D,
                                     callback?: any,
                                     options?: any): Promise<any> {

            const url: string = Resource.compilePath(path, pathParams)

            const cb: any = callback || ((err: any, result: any): void => null)

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
