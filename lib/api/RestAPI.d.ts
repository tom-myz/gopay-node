import "isomorphic-fetch";
export declare type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE";
export interface RestAPIOptions {
    endpoint?: string;
    appId?: string;
    secret?: string;
    camel?: boolean;
}
export interface ErrorResponse {
    status: string;
    code: string;
    errors: Array<{
        [key: string]: string;
    }>;
}
export declare type ResponseCallback<A> = (response: A) => void;
export declare class RestAPI {
    private endpoint;
    private appId;
    private secret;
    private camel;
    constructor(options?: RestAPIOptions);
    static requestParams(params: any): any;
    static requestUrl(url: string, data: any, isQueryString: boolean): string;
    static requestBody(data: any, isQueryString: boolean): any;
    getBody(data: any, payload: boolean): any;
    getHeaders(body?: any): Headers;
    send<A>(method: HTTPMethod, url: string, data: any, callback: ResponseCallback<A>): Promise<A>;
}
