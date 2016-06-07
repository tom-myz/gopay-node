import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class LengthBetween implements IValidator {

    public error: string = "INVALID_FORMAT_LENGTH_BETWEEN"
    public min: number
    public max: number

    constructor (min: number, max: number) {
        this.min = min
        this.max = max
    }

    public valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        const v: string = value.toString()
        return v.length >= this.min && v.length <= this.max
    }
}
