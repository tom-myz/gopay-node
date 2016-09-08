import * as Code from "./ErrorsConstants"

export type SDKErrorType = "request" | "response"

export interface SDKError {
    code: string
    errors: Array<any>
    status: number
    type: SDKErrorType
}

const defaultSDKError: SDKError = {
    code   : Code.UNKNOWN,
    errors : [],
    status : 0,
    type   : "request"
}

function getCodeByStatus (status: number): string {
    const codeMap: any = {
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
    return Object.assign({}, defaultSDKError, { type }) as SDKError
}

export interface ErrorResponseBody {
    status: string
    code: string
    errors: Array<any>
}

export function errorFromResponse (status: number, body: ErrorResponseBody): SDKError {
    if (status >= 200 && status < 400) {
        return null
    }

    if ((status < 100 && status >= 600) || !body) {
        return errorUnknown("response")
    }

    if (Object.getOwnPropertyNames(body).length !== 0) {
        return Object.assign({}, defaultSDKError, {
            code   : body.code || Code.UNKNOWN,
            errors : body.errors || [],
            status,
            type   : "response"
        })
    }

    return Object.assign({}, defaultSDKError, {
        code   : getCodeByStatus(status),
        errors : [],
        status,
        type   : "response"
    })
}

export function errorFromValidation (errors: any): SDKError {
    interface ValidationError {
        field: string
        reason: string
    }

    return Object.assign({}, defaultSDKError, {
        code   : Code.VALIDATION_ERROR,
        errors : Object.keys(errors).reduce((r: Array<ValidationError>, field: string) => {
            const codes: Array<string> = errors[field]
            r.push({ field, reason : codes[0] })
            return r
        }, [])
    })
}
