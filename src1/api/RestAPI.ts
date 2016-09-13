import "isomorphic-fetch"
import * as camelcase from "camelcase"
import * as decamelize from "decamelize"
import { DEFAULT_ENDPOINT, ENV_KEY_APP_ID, ENV_KEY_SECRET } from "../constants"
import { transformKeys } from "../utils/object"

export type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE"

export interface RestAPIOptions {
    endpoint?: string
    appId?: string
    secret?: string
    camel?: boolean
    paramValidation?: boolean
}

export interface SendRequestParams {
    body?: any
    url: string
    method: string
}

export class RestAPI {

    private endpoint: string
    private appId: string
    private secret: string
    private camel: boolean
    private token: string


    constructor (options: RestAPIOptions = {}) {
        this.endpoint = options.endpoint || DEFAULT_ENDPOINT
        this.appId = options.appId || process.env[ENV_KEY_APP_ID]
        this.secret = options.secret || process.env[ENV_KEY_SECRET]
        this.camel = options.camel || false
    }

    public static requestParams (params: any): any {
        return transformKeys(params, decamelize)
    }

    public setToken(token: string): void {
        this.token = token
    }

    public getToken(): string {
        return this.token
    }

    public send (params: SendRequestParams, callback: any, options: any = {}): Promise<any> {
        const _token: string = (options || {}).token || this.token
        const headers: Headers = new Headers()

        if (_token) {
            headers.append("Authorization", `Token ${_token}`)
        } else if (Boolean(this.appId)) {
            headers.append("Authorization", `ApplicationToken ${this.appId}|${this.secret || ""}`)
        }


        if (!(params.body instanceof FormData)) {
            headers.append("Content-Type", "application/json")
        } else if (params.body) {
            headers.append("Accept", "application/json")
        }

        return new Promise((resolve: Function, reject: Function) => {
            const request: Request = new Request(`${this.endpoint}${params.url}`, {
                body    : params.body,
                headers,
                method  : params.method,
                mode    : "cors"
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
                    callback(null, result)
                    resolve(result)
                })
                .catch((error: any) => {
                    callback(error, null)
                    reject(error)
                })
        })
    }


}
