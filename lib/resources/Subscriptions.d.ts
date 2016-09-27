import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface SubscriptionsListParams extends CRUDPaginationParams, AuthParams {
}
export interface SubscriptionCreateParams extends AuthParams {
    token: string;
    amount: number;
    currency: string;
    period: string;
    metadata?: any;
}
export interface SubscriptionItem {
    id: string;
    storeId: string;
    amount: number;
    currency: string;
    period: string;
    status: string;
    active: boolean;
    metadata?: any;
    testMode: boolean;
    createdOn: number;
    updatedOn: number;
}
export declare type ResponseSubscription = SubscriptionItem;
export declare type ResponseSubscriptions = CRUDItemsResponse<SubscriptionItem>;
export declare class Subscriptions extends CRUDResource {
    static requiredParams: Array<string>;
    static routeBase: string;
    list(storeId: string, data?: SubscriptionsListParams, callback?: ResponseCallback<ResponseSubscriptions>): Promise<ResponseSubscriptions>;
    create(data: SubscriptionCreateParams, callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription>;
    get(storeId: string, id: string, data?: AuthParams, callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription>;
}
