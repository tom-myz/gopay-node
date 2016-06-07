export function equal (a: any, b: any): boolean {
    if (typeof a !== typeof b) {
        return false
    }

    if (["undefined", "boolean", "number", "string"].indexOf(typeof a)) {
        return a === b
    }

    if (Array.isArray(a)) {
        return (a as Array<any>).reduce((r: boolean, c: any, i: any) => {
            if (r === false) {
                return false
            }
            return equal(c, b[i])
        }, true)
    }

    if (typeof a === "object") {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false
        }

        return Object.keys(a).reduce((r: boolean, k: string) => {
            if (r === false) {
                return false
            }
            return equal(a[k], b[k])
        }, true)
    }

    return false
}
