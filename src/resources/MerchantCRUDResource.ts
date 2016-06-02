import { ICRUDResource, CRUDResource } from "./CRUDResource"
import { URLSegments, IParams } from "./Resource"
import { ResourceAccessType } from "../api/RestAPI"
import { ValidationSchema } from "../validation/Validation"
import { isEmpty } from "../utils"

export interface ParamsMerchantRead extends IParams {
    id: string
    merchantId?: string
}

export interface ParamsMerchantCreate<P> extends IParams {
    data: P,
    merchantId?: string
}

export interface ParamsMerchantUpdate<P> extends IParams {
    id: string
    data: P
    merchantId?: string
}

export abstract class MerchantCRUDResource<P> extends CRUDResource<P> implements ICRUDResource<P> {

    public urlSegment: string = ""

    public url (segments: URLSegments): string {
        if (isEmpty(segments.merchantId)) {
            return `/${this.urlSegment}${segments.id ? `/${segments.id}` : ""}`
        }
        return `/merchants/${segments.merchantId}/${this.urlSegment}${segments.id ? `/${segments.id}` : ""}`
    }

    public create (params: ParamsMerchantCreate<P>): Promise<P> {
        return this._create(params)
    }

    public read (params: ParamsMerchantRead): Promise<P> {
        return this._read(params)
    }

    public update (params: ParamsMerchantUpdate<P>): Promise<P> {
        return this._update(params)
    }

    public delete (params: ParamsMerchantRead): Promise<P> {
        return this._delete(params)
    }

}
