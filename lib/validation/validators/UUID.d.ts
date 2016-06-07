import { IValidator } from "./Validator";
export declare class UUID implements IValidator {
    error: string;
    valid(value?: any): boolean;
}
