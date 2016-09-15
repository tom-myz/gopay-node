export class PathParameterError extends Error {

    public parameter: string

    constructor (parameter: string) {
        super(`GPay: Required url parameter '${parameter}' is not defined.`)
        this.parameter = parameter
    }

}
