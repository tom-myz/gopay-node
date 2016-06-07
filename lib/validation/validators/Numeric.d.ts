import { IValidator } from "./Validator";
export declare class Numeric implements IValidator {
    error: string;
    valid(value?: any): boolean;
}
