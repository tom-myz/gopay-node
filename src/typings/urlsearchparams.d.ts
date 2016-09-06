declare type USVString = string

declare class URLSearchParams {
    constructor(init?: USVString | URLSearchParams)

    append(name: any, value: any): void
    delete(name: any): void
    entries(): Iterator<USVString>
    get(name: any): USVString
    getAll(name: any): Array<USVString>
    has(name: any): boolean
    keys(): Iterator<USVString>
    set(name: any, value: any): void
    toString(): string
    values(): Iterator<USVString>
}
