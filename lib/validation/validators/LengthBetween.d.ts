import { IValidator } from "./Validator";
export declare class LengthBetween implements IValidator {
    error: string;
    min: number;
    max: number;
    constructor(min: number, max: number);
    valid(value?: any): boolean;
}
