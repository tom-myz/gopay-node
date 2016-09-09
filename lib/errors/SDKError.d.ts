export declare type SDKErrorType = "request" | "response";
export interface SDKError {
    code: string;
    errors: Array<any>;
    status: number;
    type: SDKErrorType;
}
export declare function errorUnknown(type: SDKErrorType): SDKError;
export interface ErrorResponseBody {
    status: string;
    code: string;
    errors: Array<any>;
}
export declare function errorFromResponse(status: number, body: ErrorResponseBody): SDKError;
export declare function errorFromValidation(errors: any): SDKError;
