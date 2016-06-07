export declare type ErrorMessage = {
    [key: string]: string;
};
export interface ValidationErrorMessage {
    field: string;
    reason: string;
}
export interface LocalisedError {
    message: string;
    messages: Array<string>;
}
export declare abstract class CommonError {
    code: string;
    errors: Array<ErrorMessage>;
    getLocalised(lang?: string): LocalisedError;
}
