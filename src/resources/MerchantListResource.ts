import { IListResource, ListResource } from "./ListResource"
import { URLSegments, IListParams, PListResponse } from "./Resource"
import { isEmpty } from "../utils"

export interface ParamsMerchantListRead<P> extends IListParams<P> {
    merchantId?: string
}

export abstract class MerchantListResource<P, R> extends ListResource<P, R> implements IListResource<R> {

    public url (segments: URLSegments): string {
        if (isEmpty(segments.merchantId)) {
            return `/${this.urlSegment}`
        }
        return `/merchants/${segments.merchantId}/${this.urlSegment}`
    }

    public read (params?: IListParams<P>): Promise<PListResponse<R>> {
        return this._read(params)
    }

}
