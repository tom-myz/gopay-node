import superagent = require("superagent");
import { SDKError } from "../errors/SDKError";
export interface RestAPIOptions {
    endpoint?: string;
    appId?: string;
    secret?: string;
    camel?: boolean;
}
export declare type SDKCallbackFunction = (err: SDKError, result: any) => void;
export declare class RestAPI {
    endpoint: string;
    appId: string;
    secret: string;
    private camel;
    private token;
    constructor(options: RestAPIOptions);
    static requestParams(params: Object): Object;
    setToken(token: string): void;
    send(request: superagent.Request<any>, callback: SDKCallbackFunction, token?: string): Promise<any>;
}
