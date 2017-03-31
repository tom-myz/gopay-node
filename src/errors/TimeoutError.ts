import { GenericError } from "./GenericError"

export class TimeoutError extends GenericError {

    public timeout: number

    constructor(timeout: number) {
        super()
        this.timeout = timeout
    }

}
