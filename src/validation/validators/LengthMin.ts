import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class LengthMin implements IValidator {
    public error: string = "INVALID_FORMAT_LENGTH_MIN"
    public min: number

    constructor (min: number) {
        this.min = min
    }

    public valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        const v: string = value.toString()
        return v.length >= this.min
    }
}
