export interface Transformer { (...args: Array<any>): string }

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

export function missingKeys (obj: any, keys: Array<string> = []): Array<string> {
    if (!obj) {
        return keys
    }

    if (obj.constructor !== {}.constructor) {
        return []
    }

    const objKeys: Array<string> = Object.keys(obj || {})
    const missing: Array<string> = []

    for (let key of keys) {
        if (objKeys.indexOf(key) === -1 || obj[key] === undefined) {
            missing.push(key)
        }
    }

    return missing
}

export function partitionKeys (obj: any, condition: (key: string) => boolean): Array<any> {
    const left: any = {}
    const right: any = {}

    Object.keys(obj || {}).forEach((k: string) => {
        if (condition(k)) {
            left[k] = obj[k]
        } else {
            right[k] = obj[k]
        }
    })

    return [left, right]
}
