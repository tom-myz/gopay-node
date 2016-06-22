import { getConfigurationSchema } from "./configuration"
import { getContactInfoSchema } from "./contact-info"

export const merchantCreateSchema: any = Object.assign({
    email    : "required|email",
    password : "required|string|between:8,32",
    roles    : "array"
}, getConfigurationSchema("configuration."), getContactInfoSchema("address."))

export const merchantUpdateSchema: any = Object.assign({
    email : "email"
}, getConfigurationSchema("configuration."), getContactInfoSchema("address."))

export function merchantChangePasswordSchema (isAdmin: boolean): any {
    return {
        oldPassword     : `${!isAdmin ? "required|" : ""}string`,
        newPassword     : "required|string",
        confirmPassword : "required|string|same:newPassword"
    }
}

export const merchantResetPasswordSchema: any = {
    email : "required|email"
}
