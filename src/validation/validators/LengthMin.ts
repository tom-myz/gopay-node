import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class LengthMin implements IValidator {
    error: string = "INVALID_FORMAT_LENGTH_MIN"

    constructor (public min: number) {}

    valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        const v = value.toString()
        return v.length >= this.min
    }
}
