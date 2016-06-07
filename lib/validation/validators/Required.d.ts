import { IValidator } from "./Validator";
export declare class Required implements IValidator {
    error: string;
    valid(value?: any): boolean;
}
