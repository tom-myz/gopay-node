import { getConfigurationSchema } from "./configuration"
import { getContactInfoSchema } from "./contact-info"

export const merchantCreateSchema: any = Object.assign({
    name     : "required",
    email    : "required|email",
    password : "required|min:8|max:32",
    roles    : "required|array"
}, getConfigurationSchema("configuration."))

export const merchantUpdateSchema: any = Object.assign({
    name  : "string",
    email : "email",
    roles : "array"
}, getConfigurationSchema("configuration."))

export function merchantChangePasswordSchema (isAdmin: boolean): any {
    return {
        oldPassword     : `${!isAdmin ? "required|" : ""}`,
        newPassword     : "required",
        confirmPassword : "required|same:newPassword"
    }
}

export const merchantForgotPasswordSchema: any = {
    email : "required|email"
}

export const merchantResetPasswordSchema: any = {
    newPassword     : "required",
    confirmPassword : "required|same:newPassword"
}

export const merchantCreateVerificationSchema: any = Object.assign({
    homepageUrl         : "required|url",
    companyDescription  : "required",
    businessType        : "required",
    systemManagerName   : "required",
    systemManagerNumber : "string",
    systemManagerEmail  : "email"
}, getContactInfoSchema("companyContactInfo.", true))

export const merchantUpdateVerificationSchema: any = Object.assign({
    homepageUrl         : "url",
    companyDescription  : "string",
    businessType        : "string",
    systemManagerName   : "string",
    systemManagerNumber : "string",
    systemManagerEmail  : "email"
}, getContactInfoSchema("companyContactInfo."))

export const merchantCreateVerifySchema: any = {
    percentFee : "required|numeric|min:0|max:1"
}

export const merchantTransactionHistory: any = {
    from : "string",
    to   : "string"
}

export const merchantBanSchema: any = {
    reason : "required"
}
