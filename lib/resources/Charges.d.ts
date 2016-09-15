import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface ChargesListParams extends CRUDPaginationParams, AuthParams {
}
export interface ChargeCreateParams extends AuthParams {
    name: string;
}
export interface ChargeItem {
    id: string;
    status: string;
}
export declare type ResponseCharge = ChargeItem;
export declare type ResponseCharges = CRUDItemsResponse<ChargeItem>;
export declare class Charges extends CRUDResource {
    static routeBase: string;
    list(storeId: string, data?: ChargesListParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge>;
    create(data: ChargeCreateParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge>;
    get(storeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge>;
    poll(storeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge>;
}
