import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class LengthMax implements IValidator {
    public error: string = "INVALID_FORMAT_LENGTH_MAX"
    public max: number

    constructor (max: number) {
        this.max = max
    }

    public valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        const v: string = value.toString()
        return v.length <= this.max
    }
}
