import { Model } from "./Model"
import { API } from "../../api/API"

export interface Pagination {
    total?: number
    page?: number
    pageSize?: number
}

export abstract class Collection<M extends Model<any>> implements Pagination {

    private _models: Array<M> = []

    constructor (models?: Array<M>, total?: number) {

    }

}
