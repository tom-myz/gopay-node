import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class LengthBetween implements IValidator {
    error: string = "INVALID_FORMAT_LENGTH_BETWEEN"

    constructor (public min: number,
                 public max: number) {}

    valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        const v = value.toString()
        return v.length >= this.min && v.length <= this.max
    }
}
