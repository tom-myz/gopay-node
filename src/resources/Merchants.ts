import {
    CRUDResource,
    CRUDIdParam,
    CRUDPaginationParams,
    CRUDMerchantIdParam,
    CRUDDefinedRoute
} from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { ContactInfoParams } from "./common/ContactInfo"
import { ConfigurationParams } from "./common/Configuration"
import {
    merchantCreateSchema,
    merchantUpdateSchema,
    merchantChangePasswordSchema,
    merchantResetPasswordSchema,
    merchantForgotPasswordSchema,
    merchantCreateVerificationSchema,
    merchantUpdateVerificationSchema,
    merchantCreateVerifySchema
} from "../validation/schemas/merchant"

export interface MerchantCommonParams {
    name?: string
    email?: string
    configuration?: ConfigurationParams
}

export interface MerchantCreateParams extends MerchantCommonParams {
    name: string
    email: string
    password: string
}

export interface MerchantUpdateParams extends MerchantCommonParams {}

export interface MerchantChangePassword {
    oldPassword?: string
    newPassword: string
    confirmPassword: string
}

export interface MerchantResetPassword {
    email: string
}

export interface MerchantUpdateVerification {
    homepageUrl?: string
    companyDescription?: string
    companyContactInfo?: ContactInfoParams
    businessType?: string
    systemManagerName?: string
    systemManagerNumber?: string
    systemManagerEmail?: string
}

export interface MerchantCreateVerification extends MerchantUpdateVerification {
    homepageUrl: string
    companyDescription: string
    companyContactInfo: ContactInfoParams
    businessType: string
    systemManagerName: string
}

export interface MerchantVerify {
    percentFee: number
}

export class Merchants extends CRUDResource {

    public static routeBase: string = "/merchants"
    public static routeVerification: string = "/merchants/:merchantId/verification"

    public _getVerification: CRUDDefinedRoute = this.defineRoute("GET", Merchants.routeVerification)
    public _createVerification: CRUDDefinedRoute = this.defineRoute("POST", Merchants.routeVerification)
    public _updateVerification: CRUDDefinedRoute = this.defineRoute("PATCH", Merchants.routeVerification)
    public _createVerify: CRUDDefinedRoute = this.defineRoute("POST", "/merchants/:merchantId/verify")

    public _changePassword: CRUDDefinedRoute = this.defineRoute("POST", "/merchants/:merchantId/password/reset")
    public _forgotPassword: CRUDDefinedRoute = this.defineRoute("POST", "/merchants/password/forgot")
    public _resetPassword: CRUDDefinedRoute = this.defineRoute("POST", "/merchants/password/:token")

    public list (callback?: SDKCallbackFunction, data?: CRUDPaginationParams, token?: string): Promise<any> {
        return this._listRoute(null, data, callback, { token })
    }

    public create (data: MerchantCreateParams, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        return this._createRoute(null, data, callback, { token, validationSchema : merchantCreateSchema })
    }

    public get (id: string, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        const params: CRUDIdParam = { id }
        return this._getRoute(params, null, callback, { token })
    }

    public update (id: string, data?: MerchantUpdateParams, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        const params: CRUDIdParam = { id }
        return this._updateRoute(params, data, callback, { token, validationSchema : merchantUpdateSchema })
    }

    public delete (id: string, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        const params: CRUDIdParam = { id }
        return this._deleteRoute(params, null, callback, { token })
    }

    public createVerification (merchantId: string,
                               data: MerchantCreateVerification,
                               callback?: SDKCallbackFunction,
                               token?: string): Promise<any> {

        const params: CRUDMerchantIdParam = { merchantId }
        return this._createVerification(params, data, callback, { token, validationSchema : merchantCreateVerificationSchema })
    }

    public getVerification (merchantId: string, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        const params: CRUDMerchantIdParam = { merchantId }
        return this._getVerification(params, null, callback, { token })
    }

    public updateVerification (merchantId: string,
                               data?: MerchantUpdateVerification,
                               callback?: SDKCallbackFunction,
                               token?: string): Promise<any> {

        const params: CRUDMerchantIdParam = { merchantId }
        return this._updateVerification(params, data, callback, { token, validationSchema : merchantUpdateVerificationSchema })
    }

    public verify (data: MerchantVerify, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        return this._createVerify(null, data, callback, { token, validationSchema : merchantCreateVerifySchema })
    }

    public changePassword (data: MerchantChangePassword,
                           callback?: SDKCallbackFunction,
                           merchantId?: string,
                           token?: string): Promise<any> {
        const params: CRUDMerchantIdParam = { merchantId }
        const validationSchema: any = merchantChangePasswordSchema(Boolean(token))
        return this._changePassword(params, data, callback, { token, validationSchema })
    }

    public forgotPassword (data: MerchantResetPassword, callback?: SDKCallbackFunction): Promise<any> {
        return this._forgotPassword(null, data, callback, { validationSchema : merchantForgotPasswordSchema })
    }

    public resetPassword (token: string, data: MerchantResetPassword, callback?: SDKCallbackFunction): Promise<any> {
        return this._resetPassword({ token }, data, callback, { validationSchema : merchantResetPasswordSchema })
    }

}
