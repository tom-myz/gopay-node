import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { Resource } from "./Resource";
export interface MerchantItem {
    id: string;
}
export declare type ResponseMerchant = MerchantItem;
export declare class Merchants extends Resource {
    me(data?: AuthParams, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant>;
}
