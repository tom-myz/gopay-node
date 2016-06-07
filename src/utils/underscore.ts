import * as decamelize from "decamelize"

export function underscore (obj: Object): Object {
    return Object.keys(obj).reduce((r: Object, k: string) => {
        const c: Function = (o: any): boolean => typeof o === "object" && Boolean(o)
        let v: any = (obj as any)[k]
        if (c(v)) {
            if (Array.isArray(v)) {
                v = (v as Array<any>).map((i: any) => c(i) ? underscore(i) : i)
            } else {
                v = underscore(v)
            }
        }
        (r as any)[decamelize(k)] = v
        return r
    }, {})
}
