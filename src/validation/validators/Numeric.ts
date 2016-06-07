import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class Numeric implements IValidator {
    public error: string = "INVALID_FORMAT_NUMERIC"
    public valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        const v: string = value.toString()
        return v.match(/^\d+(\.\d+)?$/) !== null
    }
}
