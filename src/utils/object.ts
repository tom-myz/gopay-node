/**
 *  @internal
 *  @module Utils
 */

export type Transformer = (...args: any[]) => string;

export function transformKeys(obj: any, transformer: Transformer): any {
    return Object.keys(obj || {}).reduce((r: any, k: string) => {
        const c: (o: any) => boolean = (o: any): boolean => typeof o === "object" && Boolean(o);
        let v: any = (obj as any)[k];
        if (c(v)) {
            if (Array.isArray(v)) {
                v = (v as any[]).map((i: any) => c(i) ? transformKeys(i, transformer) : i);
            } else {
                v = transformKeys(v, transformer);
            }
        }
        (r as any)[transformer(k)] = v;
        return r;
    }, {})
}

export function missingKeys(obj: any, keys: string[] = []): string[] {
    if (!obj) {
        return keys;
    }

    if (obj.constructor !== {}.constructor) {
        return [];
    }

    const objKeys: string[] = Object.keys(obj || {});
    const missing: string[] = [];

    for (const key of keys) {
        if (objKeys.indexOf(key) === -1 || obj[key] === undefined) {
            missing.push(key);
        }
    }

    return missing;
}
