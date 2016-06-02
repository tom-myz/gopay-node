import { WithAPI } from "../api/WithAPI"
import { ResourceAccessType } from "../api/RestAPI"
import { IValidatedListResource, ValidatedResource, ValidationSchema, Validation } from "../validation/Validation"
import { VALIDATION_ERROR } from "../errors/Errors"
import { IParams, URLSegments, SendOptions } from "./Resource"
import { Query } from "~popsicle/dist/base"
import Validator from "../validation/validators/Validator"


export interface IListResource<P> {
    url (segments: URLSegments): string
    read (params: IParams): Promise<P>
}

export interface IPaginationParams extends IParams {
    page?: number
    pageSize?: number
}

const paginationSchema: ValidationSchema = {
    page: [ new Validator.Numeric() ],
    pageSize: [ new Validator.Numeric() ]
}

export abstract class ListResource<P>
    extends WithAPI
    implements ValidatedResource<P> {

    public accessType: ResourceAccessType = ResourceAccessType.None

    private _url (segments: URLSegments): string {
        return (<IListResource<P>>(<any>this)).url(segments)
    }

    public _read (options: SendOptions<P> = {}, accessType: ResourceAccessType = this.accessType): Promise<P> {
        const fn: Function = (<IValidatedListResource<any>>(<any>this)).schemaParams || (() => {})
        const schema = Object.assign({}, paginationSchema, fn(options.data))

        return this.validate(options.data, schema)
            .then(() => this.api.send({
                method : "GET",
                url    : this._url(<URLSegments>options),
                query  : <Query>(<Object>options.data)
            }, accessType))
    }

    public validate (data: P = <P>{}, schema: ValidationSchema) {
        const errors = Validation.validate(data, schema)

        if (errors.length === 0) {
            return Promise.resolve(data)
        }
        return Promise.reject<P>(VALIDATION_ERROR(errors))
    }

}
