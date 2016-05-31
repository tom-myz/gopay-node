import { Required } from "./Required"

export interface Validator {
    error: string
    valid(value: any): boolean
}

export default {
    Required
}
