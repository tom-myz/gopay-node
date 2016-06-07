import I18n from "../locale/I18n"
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

    public getLocalised(lang?: string): LocalisedError {
        const message: string = I18n.t(this.code, undefined, lang)
        let messages: Array<string> = []

        if (this.code === VALIDATION_ERROR) {
            messages = this.errors.map((e: ErrorMessage) => {
                const field: string = Object.keys(e)[0]
                const code: string = Object.values(e)[0]
                return I18n.t(code, { field }, lang)
            })
        }

        return { message, messages }
    }

}
