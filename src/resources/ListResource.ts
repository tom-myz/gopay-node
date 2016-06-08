import { WithAPI } from "../api/WithAPI"
import { ResourceAccessType } from "../api/RestAPI"
import { IValidatedListResource, ValidatedResource, ValidationSchema, Validation } from "../validation/Validation"
import { VALIDATION_ERROR } from "../errors/Errors"
import { IParams, URLSegments, SendOptions, PListResponse } from "./Resource"
import Validator from "../validation/validators/Validator"


export interface IListResource<P> {
    url (segments: URLSegments): string
    read (params: IParams): Promise<PListResponse<P>>
}

export interface IPaginationParams extends IParams {
    page?: number
    pageSize?: number
}

const paginationSchema: ValidationSchema = {
    page     : [ new Validator.Numeric() ],
    pageSize : [ new Validator.Numeric() ]
}

export abstract class ListResource<P, R>
    extends WithAPI
    implements ValidatedResource<P> {

    public urlSegment: string = ""
    public accessType: ResourceAccessType = ResourceAccessType.None

    public url (segments: URLSegments): string {
        return `/${this.urlSegment}`
    }

    public _read (options: SendOptions<P> = {}, accessType: ResourceAccessType = this.accessType): Promise<PListResponse<R>> {
        const fn: (...a: any[]) => ValidationSchema | void = (this as IValidatedListResource<any>).schemaParams || (() => undefined)
        const schema: ValidationSchema = Object.assign({}, paginationSchema, fn(options.data))

        return this.validate(options.data, schema)
            .then(() => this.api.send({
                method : "GET",
                query  : options.data,
                url    : this.url(options as URLSegments)
            }, accessType))
    }

    public validate (data: P = {} as P, schema: ValidationSchema): Promise<P> {
        const errors: Array<any> = Validation.validate(data, schema)

        if (errors.length === 0) {
            return Promise.resolve(data)
        }
        return Promise.reject<P>(VALIDATION_ERROR(errors))
    }

}
