import { getConfigurationSchema } from "./configuration"

export const storeCreateSchema = Object.assign({
    name : "required"
}, getConfigurationSchema("configuration."))

export const storeUpdateSchema = Object.assign({
    name : ""
}, getConfigurationSchema("configuration."))
