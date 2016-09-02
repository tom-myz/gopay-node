import Validator = require("validatorjs")
import { ruleBoolean, ruleObject, ruleUUID, ruleDate } from "./rules"

/* Set up custom validators */
Validator.register(ruleBoolean[0], ruleBoolean[1], ruleBoolean[2])
Validator.register(ruleObject[0], ruleObject[1], ruleObject[2])
Validator.register(ruleUUID[0], ruleUUID[1], ruleUUID[2])
Validator.register(ruleDate[0], ruleDate[1], ruleDate[2])

export class DataValidator {

    public static create (data: any, schema: any, messages?: any): Validator {
        return new Validator(data, schema, messages)
    }

}
