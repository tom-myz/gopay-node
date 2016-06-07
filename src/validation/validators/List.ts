import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class List implements IValidator {

    public validators: Array<IValidator>
    public error: string = "INVALID_FORMAT_LIST"

    constructor (validators: Array<IValidator> = []) {
        this.validators = validators
    }

    public valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        if (!Array.isArray(value)) {
            return false
        }

        return (value as Array<any>).reduce((r1: boolean, v: any) => {
            if (r1 === false) {
                return false
            }

            return this.validators.reduce((r2: boolean, validator: IValidator) => {
                if (r2 === false) {
                    return false
                }

                return validator.valid(v)
            }, true)
        }, true)
    }
}
