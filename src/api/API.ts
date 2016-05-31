import { request } from "popsicle"
import prefix = require("popsicle-resolve")
import config from "../config"
import { RequestOptions } from "~popsicle/dist/request";
import * as Promise from "any-promise"
import Response from "~popsicle/dist/response";
import PopsicleError from "~popsicle/dist/error";
import create = require("core-js/fn/object/create");
import { ErrorAPI } from "../errors/ErrorAPI"
import * as Utils from "../utils/props"
import assign = require("core-js/fn/object/assign")

export interface APIAuthToken { token: string }

export class APIBridge {
    private _test: boolean = false
    private _auth: APIAuthToken = { token: null }

    public setTest (test: boolean): void {
        this._test = test
    }

    public isTest (test?: boolean): boolean {
        if (test !== undefined) {
            return test
        }
        return this._test
    }

    public send (options?: RequestOptions, auth?: APIAuthToken): Promise<{}> {
        const headers = {
            "Authorization": `Token ${ auth ? auth.token : this._auth.token }`
        }

        return new Promise((resolve, reject) => {
            var opts = assign({}, options, { headers }, { body: options.body ? Utils.underscore(options.body) : {} })
            request(opts)
                .use(prefix(this.getAPIBase()))
                .then((res: Response) => {
                    if (this.isResponseSuccessful(res)) {
                        resolve(Utils.camelCase(res.body))
                    } else {
                        reject(new ErrorAPI(res))
                    }
                })
                .catch(() => reject(new ErrorAPI()))
        })
    }

    public getAPIBase (test?: boolean): string {
        if (this.isTest(test)) {
            return config.apiBaseTest
        }
        return config.apiBase
    }

    private isResponseSuccessful (res: Response): boolean {
        return res.status >= 200 && res.status < 400
    }

    public setToken(auth: APIAuthToken): Promise<APIAuthToken> {
        this._auth = auth
        return Promise.resolve(auth)
    }

    public authenticate(email: string, password: string): Promise<APIAuthToken> {
        return API.send({
            method: "POST",
            url: "/authenticate",
            body: { email, password }
        }).then((auth: APIAuthToken) => this.setToken(auth))
    }
}

export const API: APIBridge = new APIBridge()
