import { RequestError } from "./RequestError";
import { ValidationError } from "./ValidationError";
import { ValidationMessage } from "../validation/Validation";
export declare const ACTION_NOT_PERMITTED: RequestError;
export declare function VALIDATION_ERROR(errors: Array<ValidationMessage>): ValidationError;
