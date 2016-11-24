declare module "camel-case" {
    interface CamelCaseFn {
        (value: string, locale?: string, mergeNumbers?: boolean): string
    }
    const camelCase: CamelCaseFn
    export = camelCase
}

