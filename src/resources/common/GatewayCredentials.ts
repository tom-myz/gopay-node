import Validator from "../../validation/validators/Validator"
import { ValidationSchema } from "../../validation/Validation"

export interface IGatewayCredentials {}

export interface PavisionCredentials extends IGatewayCredentials {
    merchantId?: string
    merchantGuid?: string
}

export interface WorldpayCredentials extends IGatewayCredentials {
    merchantId?: string
    password?: string
}

export interface PGatewayCredentials {
    [gateway: string]: IGatewayCredentials
}

export const payvisionSchema: ValidationSchema = {
    merchantGuid: [ new Validator.UUID() ]
}

export const worldpaySchema: ValidationSchema = {}

export const gatewayCredentialsSchema: ValidationSchema = {
    payvision : payvisionSchema,
    worldpay  : worldpaySchema
}
