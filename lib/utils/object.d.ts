export interface Transformer {
    (...args: any[]): string;
}
export declare function transformKeys(obj: any, transformer: Transformer): any;
export declare function missingKeys(obj: any, keys?: Array<string>): Array<string>;
export declare function partitionKeys(obj: any, condition: (key: string) => boolean): Array<any>;
