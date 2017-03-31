import { GenericError } from "./GenericError"

export class PathParameterError extends GenericError {

    public parameter: string

    constructor(parameter: string) {
        super()
        this.parameter = parameter
    }

}
