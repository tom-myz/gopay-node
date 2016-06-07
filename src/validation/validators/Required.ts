import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class Required implements IValidator {
    public error: string = "REQUIRED_VALUE"
    public valid (value?: any): boolean {
        return !isEmpty(value)
    }
}
