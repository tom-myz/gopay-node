import { CommonError } from "./CommonError";
import { ValidationMessage } from "../validation/Validation";
export declare class ValidationError extends CommonError {
    constructor(errors: Array<ValidationMessage>);
}
