import { RequestError } from "./RequestError"
import { ValidationError } from "./ValidationError"
import { ValidationMessage } from "../validation/Validation"

export const ACTION_NOT_PERMITTED: RequestError = new RequestError("ACTION_NOT_PERMITTED")
export function VALIDATION_ERROR (errors: Array<ValidationMessage>): ValidationError {
    return new ValidationError(errors)
}

