export function isEmpty (input: any): boolean {
    if ([undefined, null, ""].indexOf(input) !== -1) {
        return true
    } else if (typeof input === "object" && Object.getOwnPropertyNames(input).length === 0) {
        return true
    } else if (Array.isArray(input) && (<Array<any>>input).length === 0) {
        return true
    }
    return false
}
