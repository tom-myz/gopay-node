import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class Numeric implements IValidator {
    error: string = "INVALID_FORMAT_NUMERIC"
    valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        const v = value.toString()
        return v.match(/^\d+(\.\d+)?$/) !== null
    }
}
