import * as camelcase from "camelcase"

export function camelCase (obj: Object): Object {
    return Object.keys(obj || {}).reduce((r: Object, k: string) => {
        const c: Function = (o: any): boolean => typeof o === "object" && Boolean(o)
        let v: any = (obj as any)[k]
        if (c(v)) {
            if (Array.isArray(v)) {
                v = (v as Array<any>).map((i: any) => c(i) ? camelCase(i) : i)
            } else {
                v = camelCase(v)
            }
        }
        (r as any)[camelcase(k)] = v
        return r
    }, {})
}
