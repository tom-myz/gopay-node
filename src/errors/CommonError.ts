export type ErrorMessage = { [key: string]: string }

export abstract class CommonError {

    code: string
    errors: Array<ErrorMessage> = []

    getLocalised(lang?: string): string {
        return ""
    }

}

export { RequestError } from "./RequestError"
export { ResponseError } from "./ResponseError"
export { ValidationError } from "./ValidationError"
