import { CRUDResource, CRUDPaginationParams, CRUDDefinedRoute } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
import { ContactInfoParams } from "./common/ContactInfo";
import { ConfigurationParams } from "./common/Configuration";
export interface MerchantCommonParams {
    name?: string;
    email?: string;
    configuration?: ConfigurationParams;
}
export interface MerchantCreateParams extends MerchantCommonParams {
    name: string;
    email: string;
    password: string;
}
export interface MerchantUpdateParams extends MerchantCommonParams {
}
export interface MerchantChangePassword {
    oldPassword?: string;
    newPassword: string;
    confirmPassword: string;
}
export interface MerchantResetPassword {
    email: string;
}
export interface MerchantUpdateVerification {
    homepageUrl?: string;
    companyDescription?: string;
    companyContactInfo?: ContactInfoParams;
    businessType?: string;
    systemManagerName?: string;
    systemManagerNumber?: string;
    systemManagerEmail?: string;
}
export interface MerchantCreateVerification extends MerchantUpdateVerification {
    homepageUrl: string;
    companyDescription: string;
    companyContactInfo: ContactInfoParams;
    businessType: string;
    systemManagerName: string;
}
export interface MerchantVerify {
    percentFee: number;
}
export declare class Merchants extends CRUDResource {
    static routeBase: string;
    static routeVerification: string;
    _getVerification: CRUDDefinedRoute;
    _createVerification: CRUDDefinedRoute;
    _updateVerification: CRUDDefinedRoute;
    _createVerify: CRUDDefinedRoute;
    _changePassword: CRUDDefinedRoute;
    _forgotPassword: CRUDDefinedRoute;
    _resetPassword: CRUDDefinedRoute;
    list(callback?: SDKCallbackFunction, data?: CRUDPaginationParams, token?: string): Promise<any>;
    create(data: MerchantCreateParams, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    get(id: string, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    update(id: string, data?: MerchantUpdateParams, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    delete(id: string, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    createVerification(merchantId: string, data: MerchantCreateVerification, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    getVerification(merchantId: string, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    updateVerification(merchantId: string, data?: MerchantUpdateVerification, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    verify(merchantId: string, data: MerchantVerify, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    changePassword(data: MerchantChangePassword, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    forgotPassword(data: MerchantResetPassword, callback?: SDKCallbackFunction): Promise<any>;
    resetPassword(token: string, data: MerchantResetPassword, callback?: SDKCallbackFunction): Promise<any>;
}
