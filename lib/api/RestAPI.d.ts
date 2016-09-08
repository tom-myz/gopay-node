import "isomorphic-fetch";
import { SDKError } from "../errors/SDKError";
import { CRUDOptionalParams } from "../resources/CRUDResource";
export declare const DEFAULT_ENDPOINT: string;
export declare const DEFAULT_ENV_APP_ID: string;
export declare const DEFAULT_ENV_SECRET: string;
export interface RestAPIOptions {
    endpoint?: string;
    appId?: string;
    secret?: string;
    camel?: boolean;
}
export declare type SDKCallbackFunction = (err: SDKError, result: any) => void;
export interface SendParams {
    body?: any;
    url: string;
    method: string;
}
export declare class RestAPI {
    endpoint: string;
    appId: string;
    secret: string;
    private camel;
    private token;
    constructor(options: RestAPIOptions);
    static requestParams(params: Object): Object;
    setToken(token: string): void;
    getToken(): string;
    send(params: SendParams, callback: SDKCallbackFunction, options?: CRUDOptionalParams): Promise<any>;
}
