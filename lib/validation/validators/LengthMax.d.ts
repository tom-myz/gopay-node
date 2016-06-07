import { IValidator } from "./Validator";
export declare class LengthMax implements IValidator {
    error: string;
    max: number;
    constructor(max: number);
    valid(value?: any): boolean;
}
