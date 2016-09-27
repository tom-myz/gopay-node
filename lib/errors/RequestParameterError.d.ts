import * as ExtendableError from "es6-error";
export declare class RequestParameterError extends ExtendableError {
    parameter: string;
    constructor(parameter: string);
}
