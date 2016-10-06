import * as ExtendableError from "es6-error";
export declare class APIError extends ExtendableError {
    status: number;
    response: any;
    constructor(status: number, response?: any, route?: string);
}
