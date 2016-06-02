import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class List implements IValidator {

    constructor (public validators?: Array<IValidator>) {}

    error: string = "INVALID_FORMAT_LIST"
    valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        if (!Array.isArray(value)) {
            return false
        }

        return (<Array<any>>value).reduce((r1, v) => {
            if (r1 === false) {
                return false
            }

            return this.validators.reduce((r2, validator) => {
                if (r2 === false) {
                    return false
                }

                return validator.valid(v)
            }, true)
        }, true)
    }
}
