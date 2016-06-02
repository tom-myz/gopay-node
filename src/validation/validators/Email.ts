import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class Email implements IValidator {
    error: string = "INVALID_FORMAT_EMAIL"
    valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        const v = value.toString()
        return v.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i) !== null
    }
}
