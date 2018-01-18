import ExtendableError from "es6-error"

export class RequestParameterError extends ExtendableError {

    public parameter: string

    constructor(parameter: string) {
        super()
        this.parameter = parameter
    }

}
