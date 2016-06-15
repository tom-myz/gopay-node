import { VALIDATION_ERROR } from "./ErrorsConstants"

export type ErrorMessage = { [key: string]: string }
export interface ValidationErrorMessage {
    field: string
    reason: string
}

export interface LocalisedError {
    message: string,
    messages: Array<string>
}

export abstract class CommonError {
    public code: string
    public errors: Array<ErrorMessage> = []

}
