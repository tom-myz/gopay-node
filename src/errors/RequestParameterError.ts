export class RequestParameterError extends Error {

    public parameter: string

    constructor(parameter: string) {
        super()
        this.parameter = parameter
        Object.setPrototypeOf(this, RequestParameterError.prototype)
    }

}
