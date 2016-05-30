export class UUID {
    private _uuid: string

    constructor (str: string) {
        this._uuid = str
    }

    toString (): string {
        return this._uuid
    }
}
