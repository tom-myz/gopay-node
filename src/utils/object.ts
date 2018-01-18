import { Omit } from "type-zoo"

export type Transformer = (...args: Array<any>) => string

export function transformKeys(obj: any, transformer: Transformer): any {
    return Object.keys(obj || {}).reduce((r: any, k: string) => {
        const c: (o: any) => boolean = (o: any): boolean => typeof o === "object" && Boolean(o)
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

export function missingKeys(obj: any, keys: Array<string> = []): Array<string> {
    if (!obj) {
        return keys
    }

    if (obj.constructor !== {}.constructor) {
        return []
    }

    const objKeys: Array<string> = Object.keys(obj || {})
    const missing: Array<string> = []

    for (const key of keys) {
        if (objKeys.indexOf(key) === -1 || obj[key] === undefined) {
            missing.push(key)
        }
    }

    return missing
}

export function partitionKeys<T, K extends keyof T>(obj: T, ...keys: K[]): [Pick<T, K>, Omit<T, K>] {
    const left: Pick<T, K> = {} as any
    const right: Omit<T, K> = {} as any

    Object.keys(obj || {}).forEach((k: K) => {
        if (keys.indexOf(k) !== -1) {
            left[k] = obj[k]
        } else {
            right[k] = obj[k]
        }
    })

    return [left, right]
}
