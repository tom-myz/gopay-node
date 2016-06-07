import { ICRUDResource, CRUDResource } from "./CRUDResource";
import { URLSegments, IParams } from "./Resource";
export interface ParamsMerchantRead extends IParams {
    id: string;
    merchantId?: string;
}
export interface ParamsMerchantCreate<P> extends IParams {
    data: P;
    merchantId?: string;
}
export interface ParamsMerchantUpdate<P> extends IParams {
    id: string;
    data: P;
    merchantId?: string;
}
export declare abstract class MerchantCRUDResource<P> extends CRUDResource<P> implements ICRUDResource<P> {
    url(segments: URLSegments): string;
    create(params: ParamsMerchantCreate<P>): Promise<P>;
    read(params: ParamsMerchantRead): Promise<P>;
    update(params: ParamsMerchantUpdate<P>): Promise<P>;
    delete(params: ParamsMerchantRead): Promise<P>;
}
