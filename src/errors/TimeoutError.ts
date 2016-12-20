import * as ExtendableError from "es6-error"

export class TimeoutError extends ExtendableError {

    public timeout: number

    constructor (timeout: number) {
        super(`GPay: Timeout efter ${timeout}ms.`)

        this.timeout = timeout
    }

}
