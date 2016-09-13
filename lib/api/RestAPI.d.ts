import "isomorphic-fetch";
export declare type HTTPMethod = "GET" | "POST" | "PATCH" | "DELETE";
export interface RestAPIOptions {
    endpoint?: string;
    appId?: string;
    secret?: string;
    camel?: boolean;
    paramValidation?: boolean;
}
export interface SendRequestParams {
    body?: any;
    url: string;
    method: string;
}
export declare class RestAPI {
    private endpoint;
    private appId;
    private secret;
    private camel;
    private token;
    constructor(options?: RestAPIOptions);
    static requestParams(params: any): any;
    setToken(token: string): void;
    getToken(): string;
    send(params: SendRequestParams, callback: any, options?: any): Promise<any>;
}
