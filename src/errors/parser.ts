import { ErrorResponse } from "../api/RestAPI"
import { APIError, RequestErrorCode, ResponseErrorCode } from "./APIError"
import { PathParameterError } from "./PathParameterError"
import { RequestParameterError } from "./RequestParameterError"

function getCodeByStatus(status: number): string {
    const codeMap: any = {
        400 : ResponseErrorCode.BadRequest,
        401 : ResponseErrorCode.NotAuthorized,
        403 : ResponseErrorCode.Forbidden,
        404 : ResponseErrorCode.NotFound,
        405 : ResponseErrorCode.NotAllowed,
        409 : ResponseErrorCode.Conflicted,
        429 : ResponseErrorCode.TooManyRequests,
        500 : ResponseErrorCode.InternalServerError,
        503 : ResponseErrorCode.ServiceUnavailable
    }

    if (Object.keys(codeMap).indexOf(status.toString()) !== -1) {
        return (codeMap as any)[status]
    }

    return ResponseErrorCode.UnknownError
}

export function fromError(error: Error): ErrorResponse {
    let errorResponse: any

    if (error instanceof PathParameterError) {
        errorResponse = {
            code : RequestErrorCode.RequestError,
            errors : [{ [error.parameter] : "required" }]
        }
    } else if (error instanceof RequestParameterError) {
        errorResponse = {
            code : ResponseErrorCode.ValidationError,
            errors : [{
                field  : error.parameter,
                reason : ResponseErrorCode.RequiredValue
            }]
        }
    } else if (error instanceof APIError) {
        errorResponse = {
            code     : error.response ? error.response.code : getCodeByStatus(error.status),
            httpCode : error.status,
            errors   : error.response ? error.response.errors || [] : []
        }
    } else if (
        Object.getOwnPropertyNames(error)
            .every((props: string) => ["code", "errors", "httpCode", "status"].indexOf(props) !== -1)
    ) {
        errorResponse = error
    }

    return {
        code     : ResponseErrorCode.UnknownError,
        errors   : [],
        status   : "error",
        ...errorResponse
    }
}
