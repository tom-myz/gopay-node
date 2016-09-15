interface FormData {
    delete(name: any): void
    entries(): Iterator<Array<USVString | Blob>> & Iterable<Array<USVString | Blob>>
    get(name: any): USVString
    getAll(name: any): Array<USVString>
    has(name: any): boolean
    keys(): Iterable<USVString>
    set(name: any, value: any): void
    values(): Iterable<USVString>
}
