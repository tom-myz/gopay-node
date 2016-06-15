import _ = require("lodash")
import superagent = require("superagent")

export type SDKErrorType = "request" | "response"
export interface SDKErrorParam { [key: string]: string }

export interface SDKError {
    type: SDKErrorType
    status: number
    code: string
    message: string
    params : Array<SDKErrorParam>
}

const SDKErrorDefaults: SDKError = {
    type    : "request",
    status  : 0,
    code    : "UNKNOWN",
    message : "Unknown error occurred",
    params  : []
}

export function errorUnknown (type: SDKErrorType): SDKError {
    return _.assign(SDKErrorDefaults, { type }) as SDKError
}

export function errorFromResponse (response: superagent.Response): SDKError {
    const { status, body } = response

    if (status >= 200 && status < 400) {
        return null
    }

    console.warn(status, body)

    if (body) {

    }

    return SDKErrorDefaults
}
