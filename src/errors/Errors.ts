import { RequestError } from "./RequestError"
import { ResponseError } from "./ResponseError"
import { ValidationError } from "./ValidationError"
import { ValidationMessage } from "../validation/Validation"

export const ACTION_NOT_PERMITTED = new RequestError("ACTION_NOT_PERMITTED")
export function VALIDATION_ERROR (errors: Array<ValidationMessage>) { return new ValidationError(errors) }

