import { request } from "popsicle"
import prefix = require("popsicle-resolve")
import config from "../config"
import { RequestOptions } from "~popsicle/dist/request";
import * as Promise from "any-promise"
import Response from "~popsicle/dist/response";
import PopsicleError from "~popsicle/dist/error";
import create = require("core-js/fn/object/create");
import { ErrorAPI } from "../errors/ErrorAPI"

export abstract class APIBackend {

    send (options?: RequestOptions): Promise<{}> {
        return new Promise((resolve, reject) => {
            request(options)
                .use(prefix(API.getAPIBase()))
                .then((res: Response) => {
                    if (API.isResponseSuccessful(res)) {
                        resolve(res.body)
                    } else {
                        reject(new ErrorAPI(res))
                    }
                })
                .catch(() => reject(new ErrorAPI()))
        })
    }

}

export class API {
    private static _test: boolean = false

    static setTest (test: boolean): void {
        API._test = test
    }

    static isTest (test?: boolean): boolean {
        if (test !== undefined) {
            return test
        }
        return API._test
    }

    static getAPIBase (test?: boolean): string {
        if (API.isTest(test)) {
            return config.apiBaseTest
        }
        return config.apiBase
    }

    static isResponseSuccessful (res: Response): boolean {
        return res.status >= 200 && res.status < 400
    }
}
