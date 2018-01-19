import ExtendableError = require("es6-error")

export class TimeoutError extends ExtendableError {

    public timeout: number

    constructor(timeout: number) {
        super()
        this.timeout = timeout
    }

}
