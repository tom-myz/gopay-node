import { IListResource, ListResource } from "./ListResource"
import { URLSegments, IListParams } from "./Resource"
import { ResourceAccessType } from "../api/RestAPI"
import { ValidationSchema } from "../validation/Validation"
import { isEmpty } from "../utils"

export interface ParamsMerchantListRead<P> extends IListParams<P> {
    merchantId?: string
}

export abstract class MerchantListResource<P> extends ListResource<P> implements IListResource<P> {

    public urlSegment: string = ""

    public url (segments: URLSegments): string {
        if (isEmpty(segments.merchantId)) {
            return `/${this.urlSegment}`
        }
        return `/merchants/${segments.merchantId}/${this.urlSegment}`
    }

    public read (params?: ParamsMerchantListRead<P>): Promise<P> {
        return this._read(params)
    }

}
