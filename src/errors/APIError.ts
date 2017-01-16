import ExtendableError from "es6-error"

export class APIError extends ExtendableError {

    public status: number
    public response: any

    constructor (status: number, response?: any, route?: string) {
        super(`GPay: Route '${route}' returned error with '${status}' status.`)

        this.status = status
        this.response = Object.keys(response).length !== 0 ? response : null
    }

}
