import { ValidationSchema } from "./Validation"

export interface ValidatedModel<P> {
    validate (props: P, schema: ValidationSchema): Promise<P>
}
