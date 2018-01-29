export class TimeoutError extends Error {

    public timeout: number

    constructor(timeout: number) {
        super()
        this.timeout = timeout
        Object.setPrototypeOf(this, TimeoutError.prototype)
    }

}
