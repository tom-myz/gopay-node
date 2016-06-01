import * as decamelize from "decamelize"
import * as camelcase from "camelcase"
import * as Promise from "any-promise"
import { Model } from "./Model"
import { Validation, ValidationSchema, ValidationMessage } from "../../validation/Validation"

export abstract class CRUDModel<P> extends Model<P> {

    schemaCreate: ValidationSchema
    schemaUpdate: ValidationSchema

    abstract id (): string

    create (_props?: P): Promise<CRUDModel<P>> {
        const props = _props ? _props : this.props

        this.validate(props, this.schemaCreate).then((p) => console.warn(p)).catch((e) => console.warn(e))

        return this._api.send("POST", this.url(), props).then((p: P) => Promise.resolve(this.parse(p)))
    }

    fetch (_id?: string): Promise<CRUDModel<P>> {
        const id = _id ? _id : this.id()
        
        return this._api.send("GET", `${this.url()}/${id}`).then((p: P) => Promise.resolve(this.parse(p)))
    }

    update (_props?: P): Promise<CRUDModel<P>> {
        let props: P = <P>{}
        let promise: Promise<P>

        if (_props !== undefined) {
            if (Object.keys(this.changed(_props)).length > 0) {
                props = Object.assign({}, _props)
            }
        } else {
            props = this.changedProps
        }

        if (Object.keys(props).length === 0) {
            promise = Promise.resolve(this.props)
        } else {
            promise = this._api.send("PATCH", `${this.url()}/${this.id()}`, props)
        }

        return promise.then((p: P) => Promise.resolve(this.parse(p)))
    }

    del (): Promise<Model<P>> {
        return this._api.send("DELETE", `${this.url()}/${this.id()}`).then(() => Promise.resolve(this.clear()))
    }

}

