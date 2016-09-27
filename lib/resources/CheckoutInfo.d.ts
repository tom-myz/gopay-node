import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { Resource } from "./Resource";
export interface CheckoutInfoItem {
    testMode: boolean;
    subscriptions: boolean;
    name: string;
    paymentTypes: Array<string>;
    logoImage?: string;
    theme: {
        dark: boolean;
        color: Array<string>;
    };
}
export declare type ResponseCheckoutInfo = CheckoutInfoItem;
export declare class CheckoutInfo extends Resource {
    get(data?: AuthParams, callback?: ResponseCallback<ResponseCheckoutInfo>): Promise<ResponseCheckoutInfo>;
}
