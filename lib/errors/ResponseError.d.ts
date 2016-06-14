import { CommonError } from "./CommonError";
export declare class ResponseError extends CommonError {
    private _raw;
    constructor(error?: any);
    private parseErrorByBody(body);
    private parseErrorByStatus(status);
    private parseError();
}
