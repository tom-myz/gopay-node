import { IValidator } from "./validators/Validator"
import {error} from "util";

export type ValidationSchema = {
    [field: string]: Array<IValidator>
}

export type ValidationMessage = {
    [field: string]: string
}

export interface ValidatedResource<P> {
    validate (data: P, schema: ValidationSchema): Promise<P>
}

export interface IValidatedResource {
    schemaCreate: ValidationSchema
    schemaUpdate: ValidationSchema
}

export class Validation {
    static validate (obj: Object, schema: ValidationSchema): Array<ValidationMessage> {
        const errors: Array<ValidationMessage> = []

        Object.keys(schema).forEach((k: string) => {
            const value: any = (<any>obj)[k]
            const validators: Array<IValidator> = schema[k] || []

            for (let validator of validators) {
                if (!validator.valid(value)) {

                    errors.push(<ValidationMessage>{ [k]: validator.error })
                    break
                }
            }
        })

        return errors
    }
}
