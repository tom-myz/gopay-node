import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { Resource } from "./Resource";
export interface CheckoutInfoItem {
    id: string;
}
export declare type ResponseCheckoutInfo = CheckoutInfoItem;
export declare class CheckoutInfo extends Resource {
    get(data?: AuthParams, callback?: ResponseCallback<ResponseCheckoutInfo>): Promise<ResponseCheckoutInfo>;
}
