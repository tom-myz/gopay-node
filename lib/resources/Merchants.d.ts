import { ResponseCallback, ErrorResponse } from "../api/RestAPI";
import { CRUDResource } from "./CRUDResource";
export interface MerchantItem {
    id: string;
}
export declare type ResponseMerchant = MerchantItem | ErrorResponse;
export declare class Merchants extends CRUDResource {
    static routeBase: string;
    me(callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant>;
}
