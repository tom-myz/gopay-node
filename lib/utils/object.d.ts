export interface Transformer {
    (...args: any[]): string;
}
export declare function transformKeys(obj: any, transformer: Transformer): any;
export declare function hasAllKeys(obj: any, keys?: Array<string>): boolean;
export declare function missingKeys(obj: any, keys?: Array<string>): Array<string>;
