import { ICRUDResource, CRUDResource } from "./CRUDResource";
import { URLSegments, IParams } from "./Resource";
export interface ParamsStoreRead extends IParams {
    id?: string;
    storeId: string;
    merchantId?: string;
}
export interface ParamsStoreCreate<P> extends IParams {
    id?: string;
    storeId: string;
    data?: P;
    merchantId?: string;
}
export interface ParamsStoreUpdate<P> extends IParams {
    id?: string;
    storeId: string;
    data: P;
    merchantId?: string;
}
export declare abstract class StoreCRUDResource<P> extends CRUDResource<P> implements ICRUDResource<P> {
    single: boolean;
    url(segments: URLSegments): string;
    read(params: ParamsStoreRead): Promise<P>;
    update(params: ParamsStoreUpdate<P>): Promise<P>;
    create(params: ParamsStoreCreate<P>): Promise<P>;
    delete(params: ParamsStoreRead): Promise<P>;
}
