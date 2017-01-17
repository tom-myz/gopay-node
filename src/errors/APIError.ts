import { GenericError } from "./GenericError"

export class APIError extends GenericError {

    public status: number
    public response: any

    constructor (status: number, response?: any, route?: string) {
        super()
        this.status = status
        this.response = Object.keys(response).length !== 0 ? response : null
    }

}
