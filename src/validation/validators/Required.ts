import { Validator } from "./Validator"

export class Required implements Validator {
    error: string = "REQUIRED_VALUE"
    valid (value: string): boolean {
        return true
    }
}
