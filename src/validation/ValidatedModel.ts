import { ValidationSchema } from "./ValidationSchema"
import { ValidationError } from "./ValidationError"

export interface ValidatedModel {
    _validation: ValidationSchema
    validate (): Array<ValidationError>
}
