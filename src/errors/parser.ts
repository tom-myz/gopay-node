import { ErrorResponse } from "../api/RestAPI"
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

export function fromError (error: Error): ErrorResponse {
    let errorResponse: any

    if ((error instanceof PathParameterError) || error instanceof RequestParameterError) {
        errorResponse = {
            code : Code.VALIDATION_ERROR,
            errors : [{[error.parameter]: "required"}]
        }
    } else if (error instanceof APIError) {
        errorResponse = Object.assign(
            {}, error.response ? error.response : { code : getCodeByStatus(error.status) }, { httpCode : error.status }
        )
    }

    return Object.assign({
        code     : Code.UNKNOWN,
        errors   : [],
        status   : "error"
    }, errorResponse)
}
