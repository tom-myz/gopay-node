import { process } from "process"
import superagent = require("superagent")
import prefix = require("superagent-prefix")
import { errorFromResponse, SDKError } from "../errors/SDKError"
import { underscore, camelCase } from "../utils"

const DEFAULT_ENDPOINT: string = "http://localhost:9000"
const DEFAULT_ENV_APP_ID: string = "GPAY_APP_ID"
const DEFAULT_ENV_SECRET: string = "GPAY_SECRET"

export interface RestAPIOptions {
    endpoint?: string
    appId?: string
    secret?: string
    camel?: boolean
}

export type SDKCallbackFunction = (err: SDKError, result: any) => void

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

    public send (request: superagent.Request<any>, callback: SDKCallbackFunction, token?: string): Promise<any> {
        const _token: string = token || this.token

        return new Promise((resolve: Function, reject: Function) => {
            request
                .use(prefix(this.endpoint))
                .accept("json")
                .type("json")
                .set("Authorization", _token ? `Token ${_token}` : `${this.appId}|${this.secret}`)
                .end((error: any, response: superagent.Response) => {
                    const err: SDKError = errorFromResponse(response)

                    if (error || err !== null) {
                        callback(err, null)
                        reject(err)
                    } else {
                        const result: any = this.camel ? camelCase(response.body) : response.body
                        callback(null, result)
                        resolve(result)
                    }
                })
        })
    }
}
