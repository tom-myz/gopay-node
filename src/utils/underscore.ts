import * as decamelize from "decamelize"

export function underscore (obj: Object): Object {
    return Object.keys(obj).reduce((r, k) => {
        const c: Function = (o: any): boolean => typeof o === "object" && Boolean(o)
        let v: any = (<any>obj)[k]
        if (c(v)) {
            if (Array.isArray(v)) {
                v = <Array<any>>v.map((i: any) => c(i) ? underscore(i) : i)
            } else {
                v = underscore(v)
            }
        }
        (<any>r)[decamelize(k)] = v
        return r
    }, {})
}
