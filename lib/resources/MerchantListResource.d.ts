import { IListResource, ListResource } from "./ListResource";
import { URLSegments, IListParams, PListResponse } from "./Resource";
export interface ParamsMerchantListRead<P> extends IListParams<P> {
    merchantId?: string;
}
export declare abstract class MerchantListResource<P, R> extends ListResource<P, R> implements IListResource<R> {
    url(segments: URLSegments): string;
    read(params?: IListParams<P>): Promise<PListResponse<R>>;
}
