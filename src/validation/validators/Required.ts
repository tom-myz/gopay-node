import { IValidator } from "./Validator"

export class Required implements IValidator {
    error: string = "REQUIRED_VALUE"
    valid (value?: any): boolean {
        if (value === undefined || value === null || value === "") {
            return false
        } else if (typeof value === "object") {
            return Object.getOwnPropertyNames(value).length !== 0
        } else if (Array.isArray(value)) {
            return (<Array<any>>value).length !== 0
        }
        return true
    }
}
