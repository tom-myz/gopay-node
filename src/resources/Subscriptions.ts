import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

/* Request */
export interface SubscriptionsListParams extends CRUDPaginationParams, AuthParams {}
export interface SubscriptionCreateParams extends AuthParams {}

/* Response */
export interface SubscriptionItem {
    id: string
    status: string
}

export type ResponseSubscription = SubscriptionItem
export type ResponseSubscriptions = CRUDItemsResponse<SubscriptionItem>

export class Subscriptions extends CRUDResource {

    public static routeBase: string = "/stores/:storeId/subscriptions"

    public list (storeId: string,
                 data?: SubscriptionsListParams,
                 callback?: ResponseCallback<ResponseSubscriptions>): Promise<ResponseSubscriptions> {

        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

    public create (data: SubscriptionCreateParams,
                   callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this.defineRoute("POST", "/subscriptions")(data, callback)
    }

    public get (storeId: string,
                id: string,
                data?: AuthParams,
                callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

}
