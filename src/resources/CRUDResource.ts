import { WithAPI } from "../api/WithAPI"
import { ResourceAccessType } from "../api/RestAPI"
import { IValidatedResource, ValidatedResource, ValidationSchema, Validation } from "../validation/Validation"
import { VALIDATION_ERROR } from "../errors/Errors"
import { IParams, URLSegments, SendOptions } from "./Resource"

export interface ICRUDResource<P> {
    url (segments: URLSegments): string
    create (params: IParams): Promise<P>
    read (params: IParams): Promise<P>
    update (params: IParams): Promise<P>
    delete (params: IParams): Promise<P>
}

export abstract class CRUDResource<P>
    extends WithAPI
    implements ValidatedResource<P> {
    
    public accessType: ResourceAccessType = ResourceAccessType.None

    private _url (segments: URLSegments): string {
        return (<ICRUDResource<P>>(<any>this)).url(segments)
    }

    public _create (options: SendOptions<P>, accessType: ResourceAccessType = this.accessType): Promise<P> {
        const fn: Function = (<IValidatedResource<any>>(<any>this)).schemaCreate || (() => {})
        const schema =  Object.assign({}, fn(options.data))

        return this.validate(options.data, schema)
            .then(() => this.api.send({
                method : "POST",
                url    : this._url(<URLSegments>options),
                body   : options.data
            }, accessType))
    }

    public _read (options: SendOptions<P>, accessType: ResourceAccessType = this.accessType): Promise<P> {
        return this.api.send({
            method : "GET",
            url    : this._url(<URLSegments>options)
        }, accessType)
    }

    public _update (options: SendOptions<P>, accessType: ResourceAccessType = this.accessType): Promise<P> {
        const fn: Function = (<IValidatedResource<any>>(<any>this)).schemaUpdate || (() => {})
        const schema = Object.assign({}, fn(options.data))

        return this.validate(options.data, schema)
            .then(() => this.api.send({
                method : "PATCH",
                url    : this._url(<URLSegments>options),
                body   : options.data
            }, accessType))
    }

    public _delete (options: SendOptions<P>, accessType: ResourceAccessType = this.accessType): Promise<any> {
        return this.api.send({
            method : "DELETE",
            url    : this._url(<URLSegments>options)
        }, accessType)
    }

    public validate (data: P = <P>{}, schema: ValidationSchema) {
        const errors = Validation.validate(data, schema)

        if (errors.length === 0) {
            return Promise.resolve(data)
        }
        return Promise.reject<P>(VALIDATION_ERROR(errors))
    }

}
