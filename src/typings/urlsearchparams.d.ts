declare type USVString = string

declare class URLSearchParams {
    constructor(init?: USVString | URLSearchParams)

    public append(name: any, value: any): void
    public delete(name: any): void
    public entries(): Iterator<USVString>
    public get(name: any): USVString
    public getAll(name: any): Array<USVString>
    public has(name: any): boolean
    public keys(): Iterator<USVString>
    public set(name: any, value: any): void
    public toString(): string
    public values(): Iterator<USVString>
}
