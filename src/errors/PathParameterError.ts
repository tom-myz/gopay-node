import * as ExtendableError from "es6-error"

export class PathParameterError extends ExtendableError {

    public parameter: string

    constructor (parameter: string) {
        super(`GPay: Required url parameter '${parameter}' is not defined.`)
        this.parameter = parameter
    }

}
