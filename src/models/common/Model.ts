import assign = require("core-js/fn/object/assign")
import { APIBackend } from "../../api/API"
import * as decamelize from "decamelize"
import * as camelcase from "camelcase"
import * as Promise from "any-promise"
import { ValidatedModel } from "../../validation/ValidatedModel"
import { CRUDModel } from "./CRUDModel"

export abstract class Model<P> extends APIBackend implements CRUDModel<P> {

    private _props: P

    constructor (props?: P) {
        super()

        if (props !== undefined) {
            this._props = props
        }
    }

    clone(_props?: P) {
        const props = _props ? _props : this._props
        return new (<any>this.constructor)(props)
    }

    /* Abstracts and Commons */
    isNew (): boolean {
        return this.id() === undefined
    }

    idAttribute: string = this.autoId()

    private autoId (): string {
        const base = camelcase(decamelize(this.constructor.name.replace("Model", "")))
        return `${base}Id`
    }

    id (): string {
        return this.getProp(this.idAttribute)
    }

    abstract url(): string

    private modelUrl (_id?: string): string {
        const id = _id ? _id : this.id()
        return `${this.url()}/${id}`
    }

    /* Setters and Getters */

    getProp (prop: string): any {
        return (<any>this._props)[prop]
    }

    getProps (): P {
        return this._props
    }

    setProp (prop: string, value: any): Model<P> {
        const props = assign({}, this._props, { [prop]: value })
        return this.clone(<P>props)
    }

    setProps (props: P): Model<P> {
        return this.clone(props)
    }

    clear (): Model<P> {
        return this.clone(<P>{})
    }

    /* CRUD Actions */
    private promisedModel(promise: Promise<P>): Promise<Model<P>> {
        return new Promise((resolve, reject) => {
            promise
                .then((props: P) => resolve(new (<any>this.constructor)(props)))
                .catch((error) => reject(error))
        })
    }

    create (_props?: P) {
        const props = _props ? _props : this._props

        return this.promisedModel(
            this.send({
                method: "POST",
                url: this.url(),
                body: props
            })
        )
    }

    get (id?: string) {
        return this.promisedModel(
            this.send({
                method: "GET",
                url: this.modelUrl(id)
            })
        )
    }

    update (partial: boolean = true, props?: P) {
        return this.promisedModel(
            this.send({
                method: partial ? "PATCH" : "PUT",
                url: this.modelUrl()
            })
        )
    }

    del (id?: string) {
        return this.promisedModel(
            this.send({
                method: "DELETE",
                url: this.modelUrl(id)
            })
        )
    }

    
}
