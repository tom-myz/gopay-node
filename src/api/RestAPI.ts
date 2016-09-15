import "isomorphic-fetch"
import { errorFromResponse, SDKError } from "../errors/SDKError"
import { underscore, camelCase } from "../utils"
import { CRUDOptionalParams } from "../resources/CRUDResource"

export const DEFAULT_ENDPOINT: string = "http://localhost:9000"
export const DEFAULT_ENV_APP_ID: string = "GPAY_APP_ID"
export const DEFAULT_ENV_SECRET: string = "GPAY_SECRET"

export interface RestAPIOptions {
    endpoint?: string
    appId?: string
    secret?: string
    camel?: boolean
}

export type SDKCallbackFunction = (err: SDKError, result: any) => void

export interface SendParams {
    body?: any
    url: string
    method: string
}

export class RestAPI {

    public endpoint: string
    public appId: string
    public secret: string
    private camel: boolean
    private token: string

    constructor (options: RestAPIOptions) {
        this.endpoint = options.endpoint || DEFAULT_ENDPOINT
        this.appId = options.appId || process.env[DEFAULT_ENV_APP_ID]
        this.secret = options.secret || process.env[DEFAULT_ENV_SECRET]
        this.camel = options.camel || false
    }

    public static requestParams (params: Object): Object {
        return underscore(params)
    }

    public setToken(token: string): void {
        this.token = token
    }

    public getToken(): string {
        return this.token
    }

    public send (params: SendParams, callback: SDKCallbackFunction, options: CRUDOptionalParams = {}): Promise<any> {
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
                    const err: SDKError = errorFromResponse(status, body)

                    if (err !== null) {
                        throw err
                    }

                    const result: any = this.camel ? camelCase(body) : body
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
