import "isomorphic-fetch"
import * as camelcase from "camelcase"
import * as decamelize from "decamelize"
import * as FormData from "form-data"
import { DEFAULT_ENDPOINT, ENV_KEY_APP_ID, ENV_KEY_SECRET } from "../constants"
import { transformKeys } from "../utils/object"

export type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE"

export interface RestAPIOptions {
    endpoint?: string
    appId?: string
    secret?: string
    camel?: boolean
}

export interface ErrorResponse {
    status: string
    code: string
    errors: Array<{[key: string]: string}>
}

export type ResponseCallback<A> = (response: A) => void

export class RestAPI {

    private endpoint: string
    private appId: string
    private secret: string
    private camel: boolean

    constructor (options: RestAPIOptions = {}) {
        this.endpoint = options.endpoint || DEFAULT_ENDPOINT
        this.appId = options.appId || process.env[ENV_KEY_APP_ID]
        this.secret = options.secret || process.env[ENV_KEY_SECRET]
        this.camel = options.camel || false
    }

    public static requestParams (params: any): any {
        return transformKeys(params, decamelize)
    }

    public static requestUrl(url: string, data: any, isQueryString: boolean): string {
        let queryString: string

        if (isQueryString) {
            queryString = Object.keys(data || {})
                .map((k: string) => `${encodeURIComponent(k)}=${encodeURIComponent((data as any)[k])}`)
                .join("&")
        }
        return queryString ? `${url}?${queryString}` : url
    }

    public static requestBody(data: any, isQueryString: boolean): any {
        if (!!data && data.constructor === FormData) {
            return data
        } else if (typeof data === "object" && !isQueryString) {
            return JSON.stringify(data)
        }
        return null
    }

    public getBody (data: any, payload: boolean): any {
        return !payload ? JSON.stringify(data) : null
    }

    public getHeaders (body?: any): Headers {
        const headers: Headers = new Headers()

        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", `ApplicationToken ${this.appId}|${this.secret || ""}`)

        return headers
    }

    public send<A> (method: HTTPMethod, url: string, data: any, callback: ResponseCallback<A>): Promise<A> {
        const payload: boolean = ["GET", "DELETE"].indexOf(method) !== -1
        const body: any = this.getBody(data, payload)
        const headers: Headers = this.getHeaders(body)

        return new Promise((resolve: Function, reject: Function) => {
            const request: Request = new Request(`${this.endpoint}${RestAPI.requestUrl(url, data, payload)}`, {
                body,
                headers,
                method,
                mode : "cors"
            })

            fetch(request)
                .then((response: Response) => Promise.all([Promise.resolve(response.status), response.text()]))
                .then(([status, text]: [number, string]) => {
                    return Promise.all([
                        Promise.resolve(status),
                        Promise.resolve(text ? JSON.parse(text) : {})
                    ])
                })
                .then(([status, body]: [number, any]) => {
                    //const err: any = errorFromResponse(status, body)
                    const err: any = null


                    if (err !== null) {
                        throw err
                    }

                    const result: any = this.camel ? transformKeys(body, camelcase) : body
                    callback(result)
                    resolve(result)
                })
                .catch((error: any) => {
                    callback(error) // TODO: transform to error shape
                    reject(error)
                })
        })
    }


}
