import { WithAPI } from "../api/WithAPI"
import { ResourceAccessType } from "../api/RestAPI"
import { IValidatedResource, ValidatedResource, ValidationSchema, Validation } from "../validation/Validation"
import { VALIDATION_ERROR } from "../errors/Errors"
import { IParams, URLSegments, SendOptions } from "./Resource"

export interface ICRUDResource<P> {
    create (params: IParams): Promise<P>
    read (params: IParams): Promise<P>
    update (params: IParams): Promise<P>
    delete (params: IParams): Promise<P>
}

export interface CRUDParamsRead extends IParams {
    id: string
}

export interface CRUDParamsCreate<P> extends IParams {
    data: P
}

export interface CRUDParamsUpdate<P> extends IParams {
    id: string
    data: P
}

export abstract class CRUDResource<P>
    extends WithAPI
    implements ValidatedResource<P> {

    public urlSegment: string = ""
    public accessType: ResourceAccessType = ResourceAccessType.None

    public url (segments: URLSegments): string {
        return `/${this.urlSegment}${segments.id ? `/${segments.id}` : ""}`
    }

    public _create (options: SendOptions<P>, accessType: ResourceAccessType = this.accessType): Promise<P> {
        const fn: (...a: any[]) => ValidationSchema | void = (this as IValidatedResource<any>).schemaCreate || (() => undefined)
        const schema: ValidationSchema =  Object.assign({}, fn(options.data))

        return this.validate(options.data, schema)
            .then(() => this.api.send({
                body   : options.data,
                method : "POST",
                url    : this.url(options as URLSegments)
            }, accessType))
    }

    public _read (options: SendOptions<P>, accessType: ResourceAccessType = this.accessType): Promise<P> {
        return this.api.send({
            method : "GET",
            url    : this.url(options as URLSegments)
        }, accessType)
    }

    public _update (options: SendOptions<P>, accessType: ResourceAccessType = this.accessType): Promise<P> {
        const fn: (...a: any[]) => ValidationSchema | void = (this as IValidatedResource<any>).schemaUpdate || (() => undefined)
        const schema: ValidationSchema = Object.assign({}, fn(options.data))

        return this.validate(options.data, schema)
            .then(() => this.api.send({
                body   : options.data,
                method : "PATCH",
                url    : this.url(options as URLSegments)
            }, accessType))
    }

    public _delete (options: SendOptions<P>, accessType: ResourceAccessType = this.accessType): Promise<any> {
        return this.api.send({
            method : "DELETE",
            url    : this.url(options as URLSegments)
        }, accessType)
    }

    public validate (data: P = {} as P, schema: ValidationSchema): Promise<P> {
        const errors: Array<any> = Validation.validate(data, schema)

        if (errors.length === 0) {
            return Promise.resolve(data)
        }
        return Promise.reject<P>(VALIDATION_ERROR(errors))
    }

}
