import { ValidationSchema, ValidationError } from "./Validation"

export interface ValidatedModel<P> {
    _validationCreate: ValidationSchema
    _validationUpdate: ValidationSchema
    validate (props: P, schema: ValidationSchema): Promise<P>
}
