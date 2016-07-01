import { CRUDResource, CRUDPaginationParams, CRUDDefinedRoute } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
import { ContactInfoParams } from "./common/ContactInfo";
import { ConfigurationParams } from "./common/Configuration";
export interface MerchantCommonParams {
    name?: string;
    email?: string;
    address?: ContactInfoParams;
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
export declare class Merchants extends CRUDResource {
    static routeBase: string;
    _changePasswordRoute: CRUDDefinedRoute;
    _resetPasswordRoute: CRUDDefinedRoute;
    list(callback?: SDKCallbackFunction, data?: CRUDPaginationParams, token?: string): Promise<any>;
    create(data: MerchantCreateParams, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    get(id: string, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    update(id: string, data?: MerchantUpdateParams, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    delete(id: string, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    changePassword(data: MerchantChangePassword, callback?: SDKCallbackFunction, merchantId?: string, token?: string): Promise<any>;
    resetPassword(data: MerchantResetPassword, callback?: SDKCallbackFunction): Promise<any>;
}
