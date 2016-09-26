import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource } from "./CRUDResource";
import { ConfigurationItem } from "./common/Configuration";
export interface MerchantItem {
    id: string;
    verificationDataId?: string;
    name: string;
    email: string;
    active: boolean;
    roles: Array<string>;
    verified: boolean;
    createdOn: number;
    updatedOn: number;
    configuration: ConfigurationItem;
}
export declare type ResponseMerchant = MerchantItem;
export declare class Merchants extends CRUDResource {
    me(data?: AuthParams, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant>;
}
