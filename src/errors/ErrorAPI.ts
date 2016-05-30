import {Error, ErrorBody, ErrorMessage} from "./Error"
import Response from "~popsicle/dist/response";
import ErrorCodes, { ErrorCode } from "./ErrorCode"

export class ErrorAPI extends Error {
    
    private _raw: Response 

    constructor (error?: Response) {
        super()

        this._raw = error
        
        if (error !== undefined) {
            this.parseError()
        } else {
            this.code = ErrorCodes.UNKNOWN
        }
    }

    private getErrorMessages (): Array<ErrorMessage> {
        const body: ErrorBody = this._raw.toJSON().body

        return body.errors.map(e => (<ErrorMessage>{ [e.field]: e.reason }))
    }
    
    private getErrorCode(): ErrorCode {
        const body: ErrorBody = this._raw.toJSON().body
        
        if (body.errors.length !== 0) {
            return ErrorCodes.VALIDATION_ERROR
        }
        
        return ErrorCodes.UNKNOWN
    }
    
    private parseError () {
        const status = this._raw.status

        switch (status) {
            case 401 :
                this.code = ErrorCodes.NOT_AUTHORIZED
                break

            case 403 :
                this.code = ErrorCodes.FORBIDDEN
                break

            case 404 :
                this.code = ErrorCodes.NOT_FOUND
                break

            case 500 :
                this.code = ErrorCodes.NOT_FOUND
                break

            case 400 :
            case 409 :
                this.code = this.getErrorCode()
                if (this.code === ErrorCodes.VALIDATION_ERROR) {
                    this.errors = this.getErrorMessages()
                }
                break
            
            default :
                this.code = ErrorCodes.UNKNOWN
        }
    }
}
