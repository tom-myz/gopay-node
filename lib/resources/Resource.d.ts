import { RestAPI, HTTPMethod } from "../api/RestAPI";
export declare type DefinedRoute = (data?: any, callback?: any, pathParams?: Array<string>, ...params: Array<string>) => Promise<any>;
export declare abstract class Resource {
    api: RestAPI;
    constructor(api: RestAPI);
    static compilePath(path: string, pathParams: any): string;
    defineRoute(method: HTTPMethod, path: string, required?: Array<string>): DefinedRoute;
}
