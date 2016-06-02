import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class Required implements IValidator {
    error: string = "REQUIRED_VALUE"
    valid (value?: any): boolean {
        return !isEmpty(value)
    }
}
