export interface Transformer { (...args: any[]): string }

export function transformKeys (obj: any, transformer: Transformer): any {
    return Object.keys(obj || {}).reduce((r: any, k: string) => {
        const c: Function = (o: any): boolean => typeof o === "object" && Boolean(o)
        let v: any = (obj as any)[k]
        if (c(v)) {
            if (Array.isArray(v)) {
                v = (v as Array<any>).map((i: any) => c(i) ? transformKeys(i, transformer) : i)
            } else {
                v = transformKeys(v, transformer)
            }
        }
        (r as any)[transformer(k)] = v
        return r
    }, {})
}

export function hasAllKeys (obj: any, keys: Array<string> = []): boolean {
    const objKeys: Array<string> = Object.keys(obj || {})

    for (let key of keys) {
        if (objKeys.indexOf(key) === -1) {
            return false
        }
    }

    return true
}

export function missingKeys (obj: any, keys: Array<string> = []): Array<string> {
    const objKeys: Array<string> = Object.keys(obj || {})
    const missing: Array<string> = []

    for (let key of keys) {
        if (objKeys.indexOf(key) === -1) {
            missing.push(key)
        }
    }

    return missing
}