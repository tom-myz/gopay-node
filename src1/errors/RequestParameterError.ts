export class RequestParameterError extends Error {

    constructor (parameter: string) {
        const message: string = `[RequestError] Required parameter '${parameter}' is not defined.`
        super(message)
    }

}