import { WithAPI } from "../api/WithAPI";
import { ResourceAccessType } from "../api/RestAPI";
import { ValidatedResource, ValidationSchema } from "../validation/Validation";
import { IParams, URLSegments, SendOptions, PListResponse } from "./Resource";
export interface IListResource<P> {
    url(segments: URLSegments): string;
    read(params: IParams): Promise<PListResponse<P>>;
}
export interface IPaginationParams extends IParams {
    page?: number;
    pageSize?: number;
}
export declare abstract class ListResource<P, R> extends WithAPI implements ValidatedResource<P> {
    urlSegment: string;
    accessType: ResourceAccessType;
    url(segments: URLSegments): string;
    _read(options?: SendOptions<P>, accessType?: ResourceAccessType): Promise<PListResponse<R>>;
    validate(data: P, schema: ValidationSchema): Promise<P>;
}
