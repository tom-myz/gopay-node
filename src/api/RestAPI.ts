import { process } from "process"
import _ = require("lodash")
import superagent = require("superagent")
import prefix = require("superagent-prefix")
import {errorUnknown, errorFromResponse, SDKError} from "../errors/SDKError"
import { underscore, camelCase } from "../utils"

const DEFAULT_ENDPOINT = "http://localhost:9000"
const DEFAULT_ENV_APP_ID = ""
const DEFAULT_ENV_SECRET = ""

export interface RestAPIOptions {
    endpoint?: string
    appId?: string
    secret?: string
    camel?: boolean
}

export type SDKCallbackFunction<A> = (err: SDKError, result: A) => void

export class RestAPI {

    public endpoint: string
    public appId: string
    public secret: string
    private camel: boolean

    constructor (options: RestAPIOptions) {
        this.endpoint = options.endpoint || DEFAULT_ENDPOINT
        this.appId = options.appId || process.env[DEFAULT_ENV_APP_ID]
        this.secret = options.secret || process.env[DEFAULT_ENV_SECRET]
        this.camel = options.camel || false
    }

    static requestParams (params: Object): Object {
        return underscore(params)
    }

    public send<A> (request: superagent.Request<any>, callback?: SDKCallbackFunction<A>, token?: string): Promise<any> {
        const cb = typeof callback === "function" ? callback : () => {}

        return new Promise((resolve, reject) => {
            request
                .use(prefix(this.endpoint))
                .accept("json")
                .type("json")
                .set("Authorization", token ? `Token ${token}` : `${this.appId}|${this.secret}`)
                .end((error: any, response: superagent.Response) => {
                    if (error) {
                        const unknownError = errorUnknown("response")
                        cb(unknownError, null)
                        return reject(unknownError)
                    }

                    const err = errorFromResponse(response)

                    if (!err) {
                        cb(err, null)
                        reject(err)
                    } else {
                        const result = this.camel ? camelCase(response.body) : response.body
                        cb(null, result)
                        resolve(result)
                    }
                })
        })
    }
}
