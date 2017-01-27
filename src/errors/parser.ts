import { ErrorResponse } from "../api/RestAPI"
import { GenericError } from "./GenericError"
import { APIError } from "./APIError"
import { PathParameterError } from "./PathParameterError"
import { RequestParameterError } from "./RequestParameterError"
import * as Code from "./ErrorsConstants"

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

export function fromError (error: GenericError): ErrorResponse {
    let errorResponse: any

    console.warn(error)

    if (error instanceof PathParameterError) {
        errorResponse = {
            code : Code.REQUEST_ERROR,
            errors : [{ [error.parameter] : "required" }]
        }
    } else if (error instanceof RequestParameterError) {
        errorResponse = {
            code : Code.VALIDATION_ERROR,
            errors : [{
                field  : error.parameter,
                reason : "REQUIRED_VALUE"
            }]
        }
    } else if (error instanceof APIError) {
        errorResponse = {
            code     : error.response ? error.response.code : getCodeByStatus(error.status),
            httpCode : error.status
        }
    }

    return {
        code     : Code.UNKNOWN,
        errors   : [],
        status   : "error",
        ...errorResponse
    }
}
