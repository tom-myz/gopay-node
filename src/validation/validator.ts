import * as ValidatorJs from "validatorjs"
import Validator = ValidatorJS.Validator
import { ruleBoolean, ruleObject, ruleUUID, ruleDate } from "./rules"

/* Set up custom validators */
ValidatorJs.register(ruleBoolean[0], ruleBoolean[1], ruleBoolean[2])
ValidatorJs.register(ruleObject[0], ruleObject[1], ruleObject[2])
ValidatorJs.register(ruleUUID[0], ruleUUID[1], ruleUUID[2])
ValidatorJs.register(ruleDate[0], ruleDate[1], ruleDate[2])

export class DataValidator {

    public static create<A> (data: A, schema: any, messages?: any): Validator<A> {
        return new ValidatorJs(data, schema, messages)
    }

}
