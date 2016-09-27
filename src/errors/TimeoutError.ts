export class TimeoutError extends Error {

    public timeout: number

    constructor (timeout: number) {
        super(`GPay: Timeout efter ${timeout}ms.`)

        this.timeout = timeout
    }

}
