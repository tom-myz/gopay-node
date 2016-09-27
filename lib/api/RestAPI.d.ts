import "isomorphic-fetch";
export declare type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE";
export interface RestAPIOptions {
    endpoint?: string;
    appId?: string;
    secret?: string;
}
export interface ErrorResponse {
    status: string;
    code: string;
    errors: Array<{
        [key: string]: string;
    }>;
}
export declare type ResponseCallback<A> = (response: A | ErrorResponse) => void;
export interface AuthParams {
    appId?: string;
    secret?: string;
}
export interface RestAPIStatic extends Function {
    getData(data: any): Array<string>;
}
export declare class RestAPI {
    appId: string;
    secret: string;
    endpoint: string;
    constructor(options?: RestAPIOptions);
    static requestParams(params: any): any;
    static requestUrl(url: string, data: any, isQueryString: boolean): string;
    static handleSuccess<A>(response: A, resolve: Function, callback?: ResponseCallback<A>): void;
    static handleError<A>(error: Error, reject: Function, callback?: ResponseCallback<A>): void;
    static getData(data: any): Array<string>;
    getBody(data: any, payload: boolean): any;
    getHeaders(data?: any, body?: any): Headers;
    send<A>(method: HTTPMethod, url: string, data?: any, callback?: ResponseCallback<A>): Promise<A>;
    longPolling<A>(promise: () => Promise<A>, condition: (response: A) => boolean, callback: ResponseCallback<A>, interval?: number, timeout?: number): Promise<A>;
}
