import ExtendableError from "es6-error"

export class TimeoutError extends ExtendableError {

    public timeout: number

    constructor(timeout: number) {
        super()
        this.timeout = timeout
    }

}
