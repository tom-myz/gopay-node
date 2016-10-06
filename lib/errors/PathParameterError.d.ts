import * as ExtendableError from "es6-error";
export declare class PathParameterError extends ExtendableError {
    parameter: string;
    constructor(parameter: string);
}
