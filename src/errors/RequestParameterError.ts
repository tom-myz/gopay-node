import * as ExtendableError from "es6-error"

export class RequestParameterError extends ExtendableError {

    public parameter: string

    constructor (parameter: string) {
        super(`GPay: Required parameter '${parameter}' is not defined.`)
        this.parameter = parameter
    }

}
