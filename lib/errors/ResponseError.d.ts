import { CommonError } from "./CommonError";
import Response from "~popsicle/dist/response";
export declare class ResponseError extends CommonError {
    private _raw;
    constructor(error?: Response);
    private parseErrorByBody(body);
    private parseErrorByStatus(status);
    private parseError();
}
