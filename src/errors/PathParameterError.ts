export class PathParameterError extends Error {

    public parameter: string

    constructor(parameter: string) {
        super()
        this.parameter = parameter
        Object.setPrototypeOf(this, PathParameterError.prototype)
    }

}
