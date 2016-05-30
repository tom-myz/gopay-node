import { ErrorCode } from "./ErrorCode"

export type ValidationError = {
    field: string
    reason: string
}

export type ErrorBody = {
    status: "error"
    key: string
    errors: Array<ValidationError>
}

export type ErrorMessage = { [key: string]: string }

export abstract class Error {

    code: ErrorCode
    errors: Array<ErrorMessage> = []

    getLocalised(lang?: string): string {
        return ""
    }

}
