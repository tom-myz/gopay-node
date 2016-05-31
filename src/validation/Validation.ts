import {Validator} from "./validators/Validator";
import {error} from "util";

export type ValidationSchema = {
    [field: string]: Array<Validator>
}

export type ValidationError = {
    [field: string]: string
}

export class Validation {
    static validate (obj: Object, schema: ValidationSchema): Array<ValidationError> {
        const errors: Array<ValidationError> = []

        Object.keys(schema).forEach((k: string) => {
            const value: any = (<any>obj)[k]
            const validators: Array<Validator> = schema[k] || []

            for (let validator of validators) {
                if (!validator.valid(value)) {

                    errors.push(<ValidationError>{ [k]: validator.error })
                    break
                }
            }
        })

        return errors
    }
}
