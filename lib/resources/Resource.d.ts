import { RestAPI, HTTPMethod } from "../api/RestAPI";
export declare type DefinedRoute = (pathParams: any, data?: any, callback?: any) => Promise<any>;
export declare abstract class Resource {
    api: RestAPI;
    static compilePath(path: string, pathParams: any): string;
    constructor(api: RestAPI);
    defineRoute(method: HTTPMethod, path: string, pathParams?: Array<string>, required?: Array<string>): DefinedRoute;
}
