export type ErrorMessage = { [key: string]: string }

export abstract class CommonError {

    public code: string
    public errors: Array<ErrorMessage> = []

    getLocalised(lang?: string): string {
        return ""
    }

}