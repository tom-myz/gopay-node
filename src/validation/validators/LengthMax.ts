import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class LengthMax implements IValidator {
    error: string = "INVALID_FORMAT_LENGTH_MAX"

    constructor (public max: number) {}

    valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        const v = value.toString()
        return v.length <= this.max
    }
}
