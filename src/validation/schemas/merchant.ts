import { getConfigurationSchema } from "./configuration"
import { getContactInfoSchema } from "./contact-info"

export const merchantCreateSchema: any = Object.assign({
    name     : "required",
    email    : "required|email",
    password : "required|min:8|max:32",
    roles    : "array"
}, getConfigurationSchema("configuration."), getContactInfoSchema("address."))

export const merchantUpdateSchema: any = Object.assign({
    name  : "string",
    email : "email"
}, getConfigurationSchema("configuration."), getContactInfoSchema("address."))

export function merchantChangePasswordSchema (isAdmin: boolean): any {
    return {
        oldPassword     : `${!isAdmin ? "required|" : ""}`,
        newPassword     : "required",
        confirmPassword : "required|same:newPassword"
    }
}

export const merchantResetPasswordSchema: any = {
    email : "required|email"
}
