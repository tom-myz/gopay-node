import { CRUDResource } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
export interface AuthorizeParams {
    email: string;
    password: string;
}
export declare class Authorization extends CRUDResource {
    private _authorizeRoute;
    authorize(data: AuthorizeParams | FormData, callback?: SDKCallbackFunction): Promise<any>;
}
