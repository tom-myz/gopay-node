import { IValidator } from "./Validator";
export declare class LengthMin implements IValidator {
    error: string;
    min: number;
    constructor(min: number);
    valid(value?: any): boolean;
}
