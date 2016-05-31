import { Error } from "./Error"
import { ValidationError } from "../validation/Validation";
import ErrorCode from "./ErrorCode"

export class ErrorValidation extends Error {

    constructor (errors: Array<ValidationError>) {
        super()

        this.code = ErrorCode.VALIDATION_ERROR
        this.errors = errors
    }
}
