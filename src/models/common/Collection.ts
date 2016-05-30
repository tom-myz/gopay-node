import { Model } from "./Model"
import { APIBackend } from "../../api/API"

export abstract class Collection<M extends Model<any>> extends APIBackend {

    private _models: Array<M> = []
    private _total: number = 0

    constructor (models?: Array<M>, total?: number) {
        super()
    }

}
