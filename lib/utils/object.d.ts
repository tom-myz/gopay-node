export interface Transformer {
    (...args: any[]): string;
}
export declare function transformKeys(obj: Object, transformer: Transformer): Object;
