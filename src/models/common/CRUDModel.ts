import * as decamelize from "decamelize"
import * as camelcase from "camelcase"
import * as Promise from "any-promise"
import { Model } from "./Model"

export interface CRUDModel<P> {
    create (props?: P): Promise<Model<P>>
    fetch (id?: string): Promise<Model<P>>
    update (props?: P): Promise<Model<P>>
    del (): Promise<Model<P>>
}
