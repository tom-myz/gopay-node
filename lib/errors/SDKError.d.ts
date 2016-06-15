import superagent = require("superagent");
export declare type SDKErrorType = "request" | "response";
export interface SDKErrorParam {
    [key: string]: string;
}
export interface SDKError {
    type: SDKErrorType;
    status: number;
    code: string;
    message: string;
    params: Array<SDKErrorParam>;
}
export declare function errorUnknown(type: SDKErrorType): SDKError;
export declare function errorFromResponse(response: superagent.Response): SDKError;
