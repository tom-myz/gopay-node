export interface Transformer { (...args: any[]): string }

export function transformKeys (obj: Object, transformer: Transformer): Object {
    return Object.keys(obj || {}).reduce((r: Object, k: string) => {
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
