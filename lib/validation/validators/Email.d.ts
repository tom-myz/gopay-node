import { IValidator } from "./Validator";
export declare class Email implements IValidator {
    error: string;
    valid(value?: any): boolean;
}
