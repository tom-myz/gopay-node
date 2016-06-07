import { IValidator } from "./Validator";
export declare class List implements IValidator {
    validators: Array<IValidator>;
    error: string;
    constructor(validators?: Array<IValidator>);
    valid(value?: any): boolean;
}
