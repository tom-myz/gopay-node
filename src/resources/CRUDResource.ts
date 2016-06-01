import { WithAPI } from "../api/WithAPI"
import { ResourceAccessType } from "../api/RestAPI"
import { IValidatedResource, ValidatedResource, ValidationSchema, Validation } from "../validation/Validation"
import {error} from "util";
import {ValidationError} from "../errors/ValidationError";

export interface ICRUDResource<P> {
    url (id?: string, merchantId?: string): string
    create (data: P, merchantId?: string): Promise<P>
    read (id: string, merchantId?: string): Promise<P>
    update (id: string, data: P, merchantId?: string): Promise<P>
    delete (id: string, merchantId?: string): Promise<P>
}

export abstract class CRUDResource<P>
    extends WithAPI
    implements ValidatedResource<P> {
    
    public accessType: ResourceAccessType = ResourceAccessType.None

    private _url (id?: string, merchantId?: string): string {
        return (<ICRUDResource<P>>(<any>this)).url(id, merchantId)
    }

    public _create (data: P, merchantId?: string, accessType: ResourceAccessType = this.accessType): Promise<P> {
        const schema = (<IValidatedResource>(<any>this)).schemaCreate

        return this.validate(data, schema)
            .then(() => this.api.send({
                method : "POST",
                url    : this._url(null, merchantId),
                body   : data
            }, accessType))
    }

    public _read (id: string, merchantId?: string, accessType: ResourceAccessType = this.accessType): Promise<P> {
        return this.api.send({
            method : "GET",
            url    : this._url(id, merchantId)
        }, accessType)
    }

    public _update (id: string, data: P, merchantId?: string, accessType: ResourceAccessType = this.accessType): Promise<P> {
        return this.api.send({
            method : "PATCH",
            url    : this._url(id, merchantId),
            body   : data
        }, accessType)
    }

    public _delete (id: string, merchantId?: string, accessType: ResourceAccessType = this.accessType): Promise<P> {
        return this.api.send({
            method : "DELETE",
            url    : this._url(id, merchantId)
        }, accessType)
    }

    public validate (data: P, schema: ValidationSchema) {
        const errors = Validation.validate(data, schema)

        if (errors.length === 0) {
            return Promise.resolve(data)
        }
        return Promise.reject<P>(new ValidationError(errors))
    }

}
