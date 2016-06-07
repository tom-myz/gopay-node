import { IValidator } from "./Validator"
import { isEmpty } from "../../utils"

export class CardNumber implements IValidator {
    public error: string = "INVALID_FORMAT_CARD_NUMBER"
    public valid (value?: any): boolean {
        if (isEmpty(value)) {
            return true
        }

        const v: string = value.toString()
        const regex: RegExp = new RegExp(
            "^(?:4[0-9]{12}(?:[0-9]{3})?|" +
            "5[1-5][0-9]{14}|3[47][0-9]{13}|" +
            "3(?:0[0-5]|[68][0-9])[0-9]{11}|" +
            "6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$")
        return v.match(regex) !== null
    }
}
