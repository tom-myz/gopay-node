import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

/* Request */
export interface SubscriptionsListParams extends CRUDPaginationParams, AuthParams {}
export interface SubscriptionCreateParams extends AuthParams {
    token: string
    amount: number
    currency: string
    period: string
    metadata?: any
}

/* Response */
export interface SubscriptionItem {
    id: string
    storeId: string
    amount: number
    currency: string
    period: string
    status: string
    active: boolean
    metadata?: any
    testMode: boolean
    createdOn: number
    updatedOn: number
}

export type ResponseSubscription = SubscriptionItem
export type ResponseSubscriptions = CRUDItemsResponse<SubscriptionItem>

export class Subscriptions extends CRUDResource {

    public static requiredParams: Array<string> = ["token", "amount", "currency", "period"]

    public static routeBase: string = "/stores/:storeId/subscriptions"

    public list (storeId: string,
                 data?: SubscriptionsListParams,
                 callback?: ResponseCallback<ResponseSubscriptions>): Promise<ResponseSubscriptions> {

        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

    public create (data: SubscriptionCreateParams,
                   callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this.defineRoute("POST", "/subscriptions", Subscriptions.requiredParams)(data, callback)
    }

    public get (storeId: string,
                id: string,
                data?: AuthParams,
                callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

}
