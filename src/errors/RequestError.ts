import { CommonError } from "./CommonError"

export class RequestError extends CommonError {

    constructor (code: string) {
        super()
        this.code = code
    }
}
