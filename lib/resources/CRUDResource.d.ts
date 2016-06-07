import { WithAPI } from "../api/WithAPI";
import { ResourceAccessType } from "../api/RestAPI";
import { ValidatedResource, ValidationSchema } from "../validation/Validation";
import { IParams, URLSegments, SendOptions } from "./Resource";
export interface ICRUDResource<P> {
    create(params: IParams): Promise<P>;
    read(params: IParams): Promise<P>;
    update(params: IParams): Promise<P>;
    delete(params: IParams): Promise<P>;
}
export interface CRUDParamsRead extends IParams {
    id: string;
}
export interface CRUDParamsCreate<P> extends IParams {
    data: P;
}
export interface CRUDParamsUpdate<P> extends IParams {
    id: string;
    data: P;
}
export declare abstract class CRUDResource<P> extends WithAPI implements ValidatedResource<P> {
    urlSegment: string;
    accessType: ResourceAccessType;
    url(segments: URLSegments): string;
    _create(options: SendOptions<P>, accessType?: ResourceAccessType): Promise<P>;
    _read(options: SendOptions<P>, accessType?: ResourceAccessType): Promise<P>;
    _update(options: SendOptions<P>, accessType?: ResourceAccessType): Promise<P>;
    _delete(options: SendOptions<P>, accessType?: ResourceAccessType): Promise<any>;
    validate(data: P, schema: ValidationSchema): Promise<P>;
}
