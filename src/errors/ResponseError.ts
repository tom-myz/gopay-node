import { CommonError, ErrorMessage, ValidationErrorMessage } from "./CommonError"
import Response from "~popsicle/dist/response"
import { isEmpty } from "../utils"
import * as Errors from "./ErrorsConstants"

type ErrorBody = {
    status:"error"
    key:string
    errors:Array<Object>
}
 
export class ResponseError extends CommonError {
    
    private _raw: Response 

    constructor (error?: Response) {
        super()

        this._raw = error
        
        if (!isEmpty(error)) {
            this.parseError()
        } else {
            this.code = Errors.UNKNOWN
        }
    }
    
    private parseErrorByBody (body: ErrorBody) {
        if (isEmpty(body.errors)) {
            this.code = body.key
        } else {
            this.code = Errors.VALIDATION_ERROR
            this.errors = body.errors.map((e: ValidationErrorMessage) => {
                return (<ErrorMessage>{ [e.field]: e.reason })
            })
        }
    }
    
    private parseErrorByStatus (status: number) {
        switch (status) {
            case 401 :
                this.code = Errors.NOT_AUTHORIZED
                break

            case 403 :
                this.code = Errors.FORBIDDEN
                break

            case 404 :
                this.code = Errors.NOT_FOUND
                break

            case 400 :
                this.code = Errors.BAD_REQUEST
                break

            case 409 :
                this.code = Errors.CONFLICTED

            case 500 :
                this.code = Errors.INTERNAL_ERROR
                break

            default :
                this.code = Errors.UNKNOWN
        }
    }
    
    private parseError () {
        const status = this._raw.status
        const body: ErrorBody = this._raw.body

        if (isEmpty(body)) {
            this.parseErrorByStatus(status)
        } else {
            this.parseErrorByBody(body)
        }
    }
}
