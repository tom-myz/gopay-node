"use strict"

import "isomorphic-fetch"
import * as process from "process"
import * as decamelize from "decamelize"
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

export type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE"

export interface RestAPIOptions {
    endpoint?: string
    appId?: string
    secret?: string
}

export interface ErrorResponse {
    httpCode?: number
    status: string
    code: string
    errors: Array<{[key: string]: string}>
}

export type ResponseCallback<A> = (response: A | ErrorResponse) => void

export interface AuthParams {
    appId?: string
    secret?: string
}

export interface RestAPIStatic extends Function {
    getData(data: any): Array<string>
}

export type PromiseCreator<A> = () => Promise<A>

export class RestAPI {

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

    public static handleSuccess<A> (response: A, resolve: Function, callback?: ResponseCallback<A>): void {
        if (typeof callback === "function") {
            callback(response)
        }
        resolve(response)
    }

    public static handleError<A> (error: Error, reject: Function, callback?: ResponseCallback<A>): void {
        const err: ErrorResponse = fromError(error)
        if (typeof callback === "function") {
            callback(err)
        }
        reject(err)
    }

    public static getData (data: any): Array<any> {
        return partitionKeys(data, (k: string) => ["appId", "secret"].indexOf(k) !== -1)
    }

    public appId: string
    public secret: string
    public endpoint: string

    constructor (options: RestAPIOptions = {}) {
        this.endpoint = options.endpoint || process.env[ENV_KEY_ENDPOINT] || DEFAULT_ENDPOINT
        this.appId = options.appId || process.env[ENV_KEY_APP_ID]
        this.secret = options.secret || process.env[ENV_KEY_SECRET]
    }

    public getBody (data: any, payload: boolean): any {
        const [_, _data]: Array<any> = RestAPI.getData(data)
        return !payload ? JSON.stringify(RestAPI.requestParams(_data)) : null
    }

    public getHeaders (data?: any, body?: any): Headers {
        const [{appId, secret}, _]: Array<any> = RestAPI.getData(data)
        const headers: Headers = new Headers()

        headers.append("Accept", "application/json")
        headers.append("Content-Type", "application/json")
        if (appId || this.appId) {
            headers.append("Authorization", `ApplicationToken ${appId || this.appId}|${secret || this.secret || ""}`)
        }

        return headers
    }

    public send<A> (method: HTTPMethod, url: string, data?: any, callback?: ResponseCallback<A>): Promise<A> {
        const payload: boolean = ["GET", "DELETE"].indexOf(method) !== -1
        const body: any = this.getBody(data, payload)
        const headers: Headers = this.getHeaders(data, body)
        const [_, _data]: Array<string> = ((this.constructor as RestAPIStatic).getData || RestAPI.getData)(data)

        return new Promise((resolve: Function, reject: Function) => {
            const request: Request = new Request(
                `${this.endpoint}${RestAPI.requestUrl(url, RestAPI.requestParams(_data), payload)}`,
                {
                    body,
                    headers,
                    method,
                    mode : "cors"
                }
            )

            fetch(request)
                .then(checkStatus)
                .then(parseJSON)
                .then((response: A & Response) => RestAPI.handleSuccess(response, resolve, callback))
                .catch((error: Error) => RestAPI.handleError(error, reject, callback))
        })
    }

    public longPolling<A> (promise: PromiseCreator<A>,
                           condition: (response: A) => boolean,
                           callback?: ResponseCallback<A>,
                           interval: number = POLLING_INTERVAL,
                           timeout: number = POLLING_TIMEOUT): Promise<A> {

        let elapsedTime: number = 0

        function pollWait (wait: number): Promise<any> {
            return new Promise((resolve: Function) => setTimeout(() => {
                elapsedTime += wait
                resolve()
            }, wait))
        }

        function polling (creator: PromiseCreator<A> = promise): Promise<A> {
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

        return new Promise((resolve: Function, reject: Function) => {
            polling()
                .then((response: A) => RestAPI.handleSuccess(response, resolve, callback))
                .catch((error: Error) => RestAPI.handleError(error, reject, callback))
        })
    }

}
