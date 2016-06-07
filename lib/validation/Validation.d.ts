import { IValidator } from "./validators/Validator";
export declare type ValidationSchema = {
    [field: string]: Array<IValidator> | ValidationSchema;
};
export declare type ValidationMessage = {
    [field: string]: string;
};
export interface ValidatedResource<P> {
    validate(data: P, schema: ValidationSchema): Promise<P>;
}
export interface IValidatedResource<P> {
    schemaCreate?: (data?: P) => ValidationSchema;
    schemaUpdate?: (data?: P) => ValidationSchema;
}
export interface IValidatedListResource<P> {
    schemaParams?: (data?: P) => ValidationSchema;
}
export declare class Validation {
    static validate(obj: Object, schema: ValidationSchema, prefix?: string): Array<ValidationMessage>;
}
