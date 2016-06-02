import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class UUID implements IValidator {
    error: string = "INVALID_FORMAT_UUID"
    valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        const v = value.toString()
        return v.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i) !== null
    }
}
