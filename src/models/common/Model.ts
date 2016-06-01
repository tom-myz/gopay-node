import { ValidatedModel } from "../../validation/ValidatedModel"
import { Validation, ValidationSchema } from "../../validation/Validation"
import { ValidationError } from "../../errors/ValidationError"
import { RestAPI } from "../../api/RestAPI"
import { equal } from "../../utils"

export abstract class Model<P> implements ValidatedModel<P> {
    
    public _api: RestAPI = new RestAPI()

    public props: P
    public changedProps: P

    constructor (props: P = <P>{}) {
        this.props = props
    }

    /* Abstracts and Commons */
    abstract parse (props: P): Model<P>
    abstract url(): string

    /* Setters and Getters */

    public changed (props: P): P {
        return <P>(Object.keys(props).reduce((r: Object, k: string) => {
            const prop = (<any>props)[k]
            if (!equal((<any>this.props)[k], prop)) {
                (<any>r)[k] = prop
            }
            return r
        }, {}))
    }

    get (prop?: string): any {
        if (prop !== undefined) {
            return (<any>this.props)[prop]
        }
        return this.props
    }

    set (prop: string | P, value?: any) {
        let props: P

        if (typeof prop == "string") {
            props = <P>{ [<string>prop]: value }
        } else {
            props = <P>prop
        }

        this.changedProps = Object.assign({}, this.changedProps, this.changed(props))
        this.props = Object.assign({}, this.props, props)
        return this
    }

    clear (): Model<P> {
        return this.parse(<P>{})
    }

    /* Validation */
    validate (props: P, schema: ValidationSchema): Promise<any> {
        const errors = Validation.validate(props, schema)
        
        if (errors.length === 0) {
            return Promise.resolve(props)
        }
        
        return Promise.reject(new ValidationError(errors))
    }
    
}
