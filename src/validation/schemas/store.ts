import { getConfigurationSchema } from "./configuration"

export const storeCreateSchema = Object.assign({
    name : "required|min:3|max:64"
}, getConfigurationSchema("configuration."))

export const storeUpdateSchema = Object.assign({
    name : "string|min:3|max:64"
}, getConfigurationSchema("configuration."))
