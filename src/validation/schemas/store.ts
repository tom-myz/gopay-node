import { getConfigurationSchema } from "./configuration"

export const storeCreateSchema = Object.assign({
    name : "required|string"
}, getConfigurationSchema("configuration."))

export const storeUpdateSchema = Object.assign({
    name : "string"
}, getConfigurationSchema("configuration."))
