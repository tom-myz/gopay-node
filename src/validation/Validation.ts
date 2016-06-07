import { IValidator } from "./validators/Validator"

export type ValidationSchema = {
    [field: string]: Array<IValidator> | ValidationSchema
}

export type ValidationMessage = {
    [field: string]: string
}

export interface ValidatedResource<P> {
    validate (data: P, schema: ValidationSchema): Promise<P>
}

export interface IValidatedResource<P> {
    schemaCreate?: (data?: P) => ValidationSchema
    schemaUpdate?: (data?: P) => ValidationSchema
}

export interface IValidatedListResource<P> {
    schemaParams?: (data?: P) => ValidationSchema
}

export class Validation {
    public static validate (obj: Object, schema: ValidationSchema, prefix: string = ""): Array<ValidationMessage> {
        const errors: Array<ValidationMessage> = []

        Object.keys(schema).forEach((k: string) => {
            const value: any = (obj as any)[k]
            const validators: Array<IValidator> | ValidationSchema = schema[k] || []

            if (Array.isArray(validators)) {
                for (let validator of validators) {
                    if (!validator.valid(value)) {
                        errors.push({ [`${prefix}${k}`]: validator.error } as ValidationMessage)
                        break
                    }
                }
            } else {
                Validation.validate(value || {}, validators, `${prefix}${k}.`).forEach((e: any) => errors.push(e))
            }
        })

        return errors
    }
}
