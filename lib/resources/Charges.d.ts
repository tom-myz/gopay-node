import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
import { PaymentError } from "./common/PaymentError";
export interface ChargesListParams extends CRUDPaginationParams, AuthParams {
}
export interface ChargeCreateParams extends AuthParams {
    token: string;
    amount: number;
    currency: string;
    metadata?: any;
}
export interface ChargeItem {
    id: string;
    storeId: string;
    ledgerId?: string;
    subscriptionId?: string;
    requestedAmount: number;
    requestedCurrency: string;
    chargedAmount: number;
    chargedCurrency: string;
    status: string;
    error?: PaymentError;
    metadata?: any;
    testMode: boolean;
    createdOn: number;
    updatedOn: number;
}
export declare type ResponseCharge = ChargeItem;
export declare type ResponseCharges = CRUDItemsResponse<ChargeItem>;
export declare class Charges extends CRUDResource {
    static requiredParams: Array<string>;
    static routeBase: string;
    list(storeId: string, data?: ChargesListParams, callback?: ResponseCallback<ResponseCharges>): Promise<ResponseCharges>;
    create(data: ChargeCreateParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge>;
    get(storeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge>;
    poll(storeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ResponseCharge>): Promise<ResponseCharge>;
}
