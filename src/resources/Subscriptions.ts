import { ResponseCallback, AuthParams, ErrorResponse } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { Metadata } from "./common/Metadata"
import { ResponseCharges, ChargesListParams } from "./Charges"

export type SubscriptionPeriod = "daily" | "weekly" | "biweekly" | "monthly" | "quarterly" | "biannually" | "annually"

/* Request */
export interface SubscriptionsListParams extends CRUDPaginationParams, AuthParams {}
export interface SubscriptionCreateParams extends AuthParams {
    token: string
    amount: number
    currency: string
    period: SubscriptionPeriod
    metadata?: Metadata
}

/* Response */
export interface SubscriptionItem {
    id: string
    storeId: string
    amount: number
    currency: string
    amountFormatted: number
    period: SubscriptionPeriod
    status: string
    active: boolean
    metadata?: Metadata
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

    public delete (storeId: string,
                   id: string,
                   data?: AuthParams,
                   callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {

        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public charges (storeId: string,
                    id: string,
                    data?: ChargesListParams,
                    callback?: ResponseCallback<ResponseCharges>): Promise<ResponseCharges> {

        return this.defineRoute("GET", `${Subscriptions.routeBase}/:id/charges`)(
            data, callback, ["storeId", "id"], storeId, id
        )
    }

}
