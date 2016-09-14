export class PathParameterError extends Error {

    constructor (parameter: string) {
        const message: string = `[RequestError] Required url parameter '${parameter}' is not defined.`
        super(message)
    }

}