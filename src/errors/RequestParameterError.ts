import { GenericError } from "./GenericError"

export class RequestParameterError extends GenericError {

    public parameter: string

    constructor (parameter: string) {
        super()
        this.parameter = parameter
    }

}
