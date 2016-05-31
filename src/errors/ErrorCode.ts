
export type ErrorCode =
        "NOT_AUTHORIZED" |
        "FORBIDDEN" |
        "CONFLICT" |
        "NOT_FOUND" |
        "INTERNAL_SERVER_ERROR" |
        "VALIDATION_ERROR" |
        "UNKNOWN"

export const NOT_AUTHORIZED: ErrorCode = "NOT_AUTHORIZED"
export const FORBIDDEN: ErrorCode = "FORBIDDEN"
export const CONFLICT: ErrorCode = "CONFLICT"
export const NOT_FOUND: ErrorCode = "NOT_FOUND"
export const INTERNAL_SERVER_ERROR: ErrorCode = "INTERNAL_SERVER_ERROR"
export const VALIDATION_ERROR: ErrorCode = "VALIDATION_ERROR"
export const UNKNOWN: ErrorCode = "UNKNOWN"

export const ErrorCodesMapping: { [_: string] : ErrorCode } = {
    "INVALID_PAYMENT_TYPE": "UNKNOWN",
    "INVALID_PAYMENT_PROCESS": "UNKNOWN",
    "EMAIL_EXISTS": "CONFLICT",
    "STORE_EXISTS": "CONFLICT",
}

export default {
    NOT_AUTHORIZED,
    FORBIDDEN,
    CONFLICT,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    VALIDATION_ERROR,
    UNKNOWN
}
