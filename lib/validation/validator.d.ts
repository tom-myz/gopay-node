import Validator = ValidatorJS.Validator;
export declare class DataValidator {
    static create<A>(data: A, schema: any, messages?: any): Validator<A>;
}
