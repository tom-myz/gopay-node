import { ICRUDResource, CRUDResource } from "./CRUDResource"
import { URLSegments, IParams } from "./Resource"
import { ResourceAccessType } from "../api/RestAPI"
import { ValidationSchema } from "../validation/Validation"
import { isEmpty } from "../utils"

export interface ParamsStoreRead extends IParams {
    id?: string
    storeId: string
    merchantId?: string
}

export interface ParamsStoreCreate<P> extends IParams {
    id?: string
    storeId: string
    data?: P
    merchantId?: string
}

export interface ParamsStoreUpdate<P> extends IParams {
    id?: string
    storeId: string
    data: P
    merchantId?: string
}

export abstract class StoreCRUDResource<P> extends CRUDResource<P> implements ICRUDResource<P> {

    public urlSegment: string = ""
    public single: boolean = true

    public url (segments: URLSegments): string {
        const id = (!this.single && segments.id) ? `/${segments.id}` : ""

        if (isEmpty(segments.merchantId)) {
            return `/stores/${segments.storeId}/${this.urlSegment}${id}`
        }
        return `/merchants/${segments.merchantId}/stores/${segments.storeId}/${this.urlSegment}${id}`
    }

    public read (params: ParamsStoreRead): Promise<P> {
        return this._read(params)
    }

    public update (params: ParamsStoreUpdate<P>): Promise<P> {
        return this._update(params)
    }

    public create (params: ParamsStoreCreate<P>): Promise<P> {
        return this._create(params)
    }

    public delete (params: ParamsStoreRead): Promise<P> {
        return this._update(params)
    }

}
