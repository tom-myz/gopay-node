import { IValidator } from "./Validator";
export declare class CardNumber implements IValidator {
    error: string;
    valid(value?: any): boolean;
}
