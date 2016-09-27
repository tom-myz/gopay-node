import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource } from "./CRUDResource";
import { ContactInfo } from "./common/ContactInfo";
export interface VerificationCreateParams extends AuthParams {
    homepageUrl: string;
    companyDescription: string;
    companyContactInfo: ContactInfo;
    businessType: string;
    systemManagerName: string;
    systemManagerNumber?: string;
    systemManagerEmail?: string;
}
export interface VerificationUpdateParams extends AuthParams {
    homepageUrl?: string;
    companyDescription?: string;
    companyContactInfo?: ContactInfo;
    businessType?: string;
    systemManagerName?: string;
    systemManagerNumber?: string;
    systemManagerEmail?: string;
}
export interface VerificationItem {
    id: string;
    homepageUrl: string;
    companyDescription: string;
    companyContactInfo: ContactInfo;
    businessType: string;
    systemManagerName: string;
    systemManagerNumber?: string;
    systemManagerEmail?: string;
    createdOn: number;
    updatedOn: number;
}
export declare type ResponseVerification = VerificationItem;
export declare class Verification extends CRUDResource {
    static requiredParams: Array<string>;
    static routeBase: string;
    create(data: VerificationCreateParams, callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification>;
    get(data?: AuthParams, callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification>;
    update(data?: VerificationUpdateParams, callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification>;
}
