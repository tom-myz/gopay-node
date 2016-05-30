

export interface Validator {
    error: string
    valid(value: string): boolean
}

