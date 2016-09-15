export class RequestParameterError extends Error {

    public parameter: string

    constructor (parameter: string) {
        super(`GPay: Required parameter '${parameter}' is not defined.`)
        this.parameter = parameter
    }

}
