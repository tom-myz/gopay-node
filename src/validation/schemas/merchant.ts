import { getConfigurationSchema } from "./configuration"
import { getContactInfoSchema } from "./contact-info"

export const merchantCreateSchema = Object.assign({
    email    : "required|email",
    password : "required|string|between:8,32",
    roles    : "array"
}, getConfigurationSchema("configuration."), getContactInfoSchema("address."))

export const merchantUpdateSchema = Object.assign({
    email : "email"
}, getConfigurationSchema("configuration."), getContactInfoSchema("address."))
