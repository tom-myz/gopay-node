import superagent = require("superagent")
import * as Code from "./ErrorsConstants"

export type SDKErrorType = "request" | "response"

export interface SDKError {
    type: SDKErrorType
    status: number
    code: string
    errors : Array<any>
}

const SDKErrorDefaults: SDKError = {
    type    : "request",
    status  : 0,
    code    : Code.UNKNOWN,
    errors  : []
}

function getCodeByStatus (status: number) {
    const codeMap = {
        400 : Code.BAD_REQUEST,
        401 : Code.NOT_AUTHORIZED,
        403 : Code.FORBIDDEN,
        404 : Code.NOT_FOUND,
        405 : Code.NOT_ALLOWED,
        409 : Code.CONFLICTED,
        429 : Code.TOO_MANY_REQUESTS,
        500 : Code.INTERNAL_ERROR,
        503 : Code.SERVICE_UNAVAILABLE
    }

    if (Object.keys(codeMap).indexOf(status.toString()) !== -1) {
        return (codeMap as any)[status]
    }

    return Code.UNKNOWN
}

export function errorUnknown (type: SDKErrorType): SDKError {
    return Object.assign(SDKErrorDefaults, { type }) as SDKError
}

export function errorFromResponse (response: superagent.Response): SDKError {
    interface ErrorResponseBody {
        status: string
        code: string
        errors: Array<any>
    }

    if (!response) {
        return errorUnknown("response")
    }

    const status: number = response.status
    const body: ErrorResponseBody = response.body

    if (status >= 200 && status < 400) {
        return null
    }

    if (body) {
        return Object.assign({}, SDKErrorDefaults, {
            type   : "response",
            code   : body.code,
            errors : body.errors,
            status
        })
    }

    return Object.assign({}, SDKErrorDefaults, {
        type   : "response",
        code   : getCodeByStatus(status),
        errors : [],
        status
    })
}

export function errorFromValidation (errors: any): SDKError {
    interface ValidationError {
        field: string
        reason: string
    }

    return Object.assign({}, SDKErrorDefaults, {
        code   : Code.VALIDATION_ERROR,
        errors : Object.keys(errors).reduce((r: Array<ValidationError>, field: string) => {
            const codes: Array<string> = errors[field]
            r.push({ field, reason : codes[0] })
            return r
        }, [])
    })
}
