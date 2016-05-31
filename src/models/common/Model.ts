import assign = require("core-js/fn/object/assign")
import { API } from "../../api/API"
import * as decamelize from "decamelize"
import * as camelcase from "camelcase"
import * as Promise from "any-promise"
import { ValidatedModel } from "../../validation/ValidatedModel"
import { Validation, ValidationSchema, ValidationError } from "../../validation/Validation"
import { CRUDModel } from "./CRUDModel"
import { WithId } from "./WithId"
import equal = require("deep-equal")
import { ErrorValidation } from "../../errors/ErrorValidation"
import Validator from "../../validation/validators/Validator"

export abstract class Model<P extends WithId> implements CRUDModel<P>, ValidatedModel<P> {

    private _props: P = <P>{}
    private _changedProps: P = <P>{}

    constructor (props: P = <P>{}) {
        this._props = props
        this.parse(props)
    }

    /* Abstracts and Commons */
    abstract parse (props: P): Model<P>
    abstract url(): string

    /* Setters and Getters */

    private changedProps (props: P): P {
        return <P>(Object.keys(props).reduce((r: Object, k: string) => {
            const prop = (<any>props)[k]
            if (!equal((<any>this._props)[k], prop)) {
                (<any>r)[k] = prop
            }
            return r
        }, {}))
    }

    get (prop?: string): any {
        if (prop !== undefined) {
            return (<any>this._props)[prop]
        }
        return this._props
    }

    set (prop: string | P, value?: any) {
        let props: P

        if (typeof prop == "string") {
            props = <P>{ [<string>prop]: value }
        } else {
            props = <P>prop
        }

        this._changedProps = assign({}, this._changedProps, this.changedProps(props))
        this._props = assign({}, this._props, props)
        return this
    }

    clear (): Model<P> {
        return this.parse(<P>{})
    }

    /* Validation */

    _validationCreate: ValidationSchema = {
        "email" : [new Validator.Required()]
    }
    _validationUpdate: ValidationSchema

    validate (props: P, schema: ValidationSchema) {
        const errors = Validation.validate(props, schema)
        
        if (errors.length === 0) {
            return Promise.resolve(props)
        }
        
        return Promise.reject(new ErrorValidation(errors))
    }

    /* CRUD Actions */

    create (_props?: P) {
        const props = _props ? _props : this._props
        
        this.validate(props, this._validationCreate).then((p) => console.warn(p)).catch((e) => console.warn(e))

        return API.send({
            method: "POST",
            url: this.url(),
            body: props
        }).then((p: P) => Promise.resolve(this.parse(p)))
    }

    fetch (_id?: string) {
        const id = _id ? _id : this._props.id
        
        return API.send({
            method: "GET",
            url: `${this.url()}/${id}`
        }).then((p: P) => Promise.resolve(this.parse(p)))
    }

    update (_props?: P) {
        let props: P = <P>{}
        let promise: Promise<P>

        if (_props !== undefined) {
            if (Object.keys(this.changedProps(_props)).length > 0) {
                props = assign({}, _props)
            }
        } else {
            props = this._changedProps
        }

        if (Object.keys(props).length === 0) {
            promise = Promise.resolve(this._props)
        } else {
            promise = API.send({
                method: "PATCH",
                url: `${this.url()}/${this._props.id}`,
                body: props
            })
        }

        return promise.then((p: P) => Promise.resolve(this.parse(p)))
    }

    del () {
        return API.send({
            method: "DELETE",
            url: `${this.url()}/${this._props.id}`
        }).then(() => Promise.resolve(this.clear()))
    }
    
}
