import superagent = require("superagent");
import { SDKError } from "../errors/SDKError";
export interface RestAPIOptions {
    endpoint?: string;
    appId?: string;
    secret?: string;
    camel?: boolean;
}
export declare type SDKCallbackFunction<A> = (err: SDKError, result: A) => void;
export declare class RestAPI {
    endpoint: string;
    appId: string;
    secret: string;
    private camel;
    constructor(options: RestAPIOptions);
    static requestParams(params: Object): Object;
    send<A>(request: superagent.Request<any>, callback?: SDKCallbackFunction<A>, token?: string): Promise<any>;
}
