import superagent = require("superagent");
export declare type SDKErrorType = "request" | "response";
export interface SDKError {
    type: SDKErrorType;
    status: number;
    code: string;
    errors: Array<any>;
}
export declare function errorUnknown(type: SDKErrorType): SDKError;
export declare function errorFromResponse(response: superagent.Response): SDKError;
export declare function errorFromValidation(errors: any): SDKError;
