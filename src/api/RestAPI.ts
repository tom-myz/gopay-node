import "isomorphic-fetch"
import process = require("process")
import decamelize = require("decamelize")
import {
    DEFAULT_ENDPOINT,
    ENV_KEY_ENDPOINT,
    ENV_KEY_APP_ID,
    ENV_KEY_SECRET,
    POLLING_TIMEOUT,
    POLLING_INTERVAL
} from "../constants"
import { transformKeys, partitionKeys } from "../utils/object"
import { checkStatus, parseJSON } from "../utils/fetch"
import { TimeoutError } from "../errors/TimeoutError"
import { fromError } from "../errors/parser"
import { stringify as stringifyQuery } from "query-string"
import { Omit } from "type-zoo"
import { ResponseErrorCode, RequestErrorCode } from "../errors/APIError"

export const enum HTTPMethod {
    GET    = "GET",
    POST   = "POST",
    PATCH  = "PATCH",
    UPDATE = "PATCH",
    DELETE = "DELETE",
    OPTION = "OPTION",
    HEAD   = "HEAD"
}

export interface RestAPIOptions {
    endpoint?: string
    appId?: string
    secret?: string
}

export interface SubError {
    reason: RequestErrorCode | ResponseErrorCode
}

export interface ValidationError extends SubError {
    field: string
}

export interface ErrorResponse {
    httpCode?: number
    status: string
    code: ResponseErrorCode | RequestErrorCode
    errors: Array<SubError | ValidationError>
}

export type ResponseCallback<A> = (response: A | ErrorResponse) => void

export type PromiseResolve<A> = (value?: A | PromiseLike<A>) => void
export type PromiseReject = (reason?: any) => void

export const IDEMPOTENCY_KEY_HEADER: string = "Idempotency-Key"

export interface AuthParams {
    appId?: string
    secret?: string
}

export interface PollParams {
    poll: boolean
}

export interface IdempotentParams {
    idempotentKey?: string
}

export type DataParams<T> = T & AuthParams & IdempotentParams

export interface RestAPIStatic extends Function {
    getData: typeof RestAPI.getData
}

export type PromiseCreator<A> = () => Promise<A>

export class RestAPI {

    public static requestParams(params: any): any {
        return transformKeys(params, decamelize)
    }

    public static requestUrl(url: string, data: any, isQueryString: boolean): string {
        const _data: any = data || {}

        return (isQueryString && Object.getOwnPropertyNames(_data).length !== 0)
            ? `${url}?${stringifyQuery(_data, { arrayFormat : "bracket" } )}`
            : url
    }

    public static handleSuccess<A>(response: A, resolve: PromiseResolve<A>, callback?: ResponseCallback<A>): void {
        if (typeof callback === "function") {
            callback(response)
        }
        resolve(response)
    }

    public static handleError<A>(error: Error, reject: PromiseReject, callback?: ResponseCallback<A>): void {
        const err: ErrorResponse = fromError(error)
        if (typeof callback === "function") {
            callback(err)
        }
        reject(err)
    }

    public static getData<Data = any>(
        data: DataParams<Data>
    ): [Pick<DataParams<Data>, "appId" | "secret" | "idempotentKey">, Omit<DataParams<Data>, "appId" | "secret" | "idempotentKey">] {
        return partitionKeys(data, "appId", "secret", "idempotentKey")
    }

    public appId: string
    public secret: string
    public endpoint: string

    constructor(options: RestAPIOptions = {}) {
        this.endpoint = options.endpoint || process.env[ENV_KEY_ENDPOINT] || DEFAULT_ENDPOINT
        this.appId = options.appId || process.env[ENV_KEY_APP_ID]
        this.secret = options.secret || process.env[ENV_KEY_SECRET]
    }

    public getBody(data: any, payload: boolean): any {
        const [_, _data]: Array<any> = RestAPI.getData(data)
        return !payload ? JSON.stringify(RestAPI.requestParams(_data)) : null
    }

    public getHeaders(data?: any, body?: any): Headers {
        const [{appId, secret}, _]: Array<any> = RestAPI.getData(data)
        const headers: Headers = new Headers()

        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        if (appId || this.appId) {
            headers.append("Authorization", `ApplicationToken ${appId || this.appId}|${secret || this.secret || ""}`)
        }

        return headers
    }

    public getWebSocketUrl(path: string): string {
        const auth: string = `ApplicationToken:${this.appId || ""}@`
        return `${this.endpoint.replace(/^http(s?:\/\/)(.*)/, `ws$1${auth}$2`)}${path}`
    }

    public send<A, Data = any>(method: HTTPMethod,
                               url: string,
                               data?: Data & AuthParams & IdempotentParams,
                               callback?: ResponseCallback<A>): Promise<A> {
        const payload: boolean = [HTTPMethod.GET, HTTPMethod.DELETE].indexOf(method) !== -1
        const body: any = this.getBody(data, payload)
        const headers: Headers = this.getHeaders(data, body)
        const [_requestParams, _data] = ((this.constructor as RestAPIStatic).getData || RestAPI.getData)(data)

        if (_requestParams.idempotentKey) {
            headers.append(IDEMPOTENCY_KEY_HEADER, _requestParams.idempotentKey)
        }

        return new Promise((resolve: PromiseResolve<A>, reject: PromiseReject) => {
            const params: RequestInit = {
                body,
                headers,
                method,
                mode : "cors"
            }
            const request: Request = new Request(
                `${this.endpoint}${RestAPI.requestUrl(url, RestAPI.requestParams(_data), payload)}`,
                Object.keys(params).reduce((r: RequestInit, key: string) => {
                    if (!!params[key]) {
                        r[key] = params[key]
                    }
                    return r
                }, {})
            )

            fetch(request)
                .then(checkStatus)
                .then(parseJSON)
                .then((response: A & Response) => RestAPI.handleSuccess(response, resolve, callback))
                .catch((error: Error) => RestAPI.handleError(error, reject, callback))
        })
    }

    public longPolling<A>(promise: PromiseCreator<A>,
                          condition: (response: A) => boolean,
                          callback?: ResponseCallback<A>,
                          interval: number = POLLING_INTERVAL,
                          timeout: number = POLLING_TIMEOUT): Promise<A> {

        let elapsedTime: number = 0

        function pollWait(wait: number): Promise<any> {
            return new Promise((resolve: PromiseResolve<any>) => setTimeout(() => {
                elapsedTime += wait
                resolve()
            }, wait))
        }

        function polling(creator: PromiseCreator<A> = promise): Promise<A> {
            if (elapsedTime >= timeout) {
                return Promise.reject(new TimeoutError(timeout))
            }

            return pollWait(interval)
                .then(creator)
                .then((response: A) => {
                    if (!condition(response)) {
                        return polling(creator)
                    }
                    return response
                })
        }

        return new Promise((resolve: PromiseResolve<A>, reject: PromiseReject) => {
            polling()
                .then((response: A) => RestAPI.handleSuccess(response, resolve, callback))
                .catch((error: Error) => RestAPI.handleError(error, reject, callback))
        })
    }

}
