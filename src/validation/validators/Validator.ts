import { Required } from "./Required"

export interface IValidator {
    error: string
    valid(value: any): boolean
}

export default {
    Required
}
