import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource } from "./CRUDResource";
export interface VerificationCreateParams extends AuthParams {
}
export interface VerificationUpdateParams extends AuthParams {
}
export interface VerificationItem {
    id: string;
}
export declare type ResponseVerification = VerificationItem;
export declare class Verification extends CRUDResource {
    static routeBase: string;
    create(data: VerificationCreateParams, callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification>;
    get(data?: AuthParams, callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification>;
    update(data?: VerificationUpdateParams, callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification>;
}
