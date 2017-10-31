import { ResponseCallback, AuthParams, ErrorResponse } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { Metadata } from "./common/Metadata"
import { ProcessingMode } from "./common/ProcessingMode"
import { ResponseCharges, ChargesListParams } from "./Charges"
import { Resource } from "./Resource"
import { WithIdempotentKey } from "./common/Common"

export const enum SubscriptionPeriod {
    DAILY        = "daily",
    WEEKLY       = "weekly",
    BIWEEKLY     = "biweekly",
    MONTHLY      = "monthly",
    QUARTERLY    = "quarterly",
    SEMIANNUALLY = "semiannually",
    ANNUALLY     = "annually"
}

export const enum SubscriptionStatus {
    UNVERIFIED  = "unverified",
    CURRENT     = "current",
    UNPAID      = "unpaid",
    CANCELLED   = "cancelled",
    UNCONFIRMED = "unconfirmed"
}

/* Request */
export interface SubscriptionsListParams extends CRUDPaginationParams, AuthParams {
    search?: string
    status?: SubscriptionStatus
    mode?: ProcessingMode
}

export interface SubscriptionCreateParams extends AuthParams, WithIdempotentKey {
    transactionTokenId: string
    amount: number
    currency: string
    period: SubscriptionPeriod
    metadata?: Metadata
}

export interface SubscriptionUpdateParams extends AuthParams, WithIdempotentKey {
    transactionTokenId?: string
    amount?: number
    metadata?: Metadata
}

/* Response */
export interface SubscriptionItem {
    id: string
    merchantId: string
    storeId: string
    transactionTokenId: string
    amount: number
    currency: string
    amountFormatted: number
    period: SubscriptionPeriod
    status: SubscriptionStatus
    metadata?: Metadata
    mode: ProcessingMode
    createdOn: string
}

export type ResponseSubscription = SubscriptionItem
export type ResponseSubscriptions = CRUDItemsResponse<SubscriptionItem>

export class Subscriptions extends CRUDResource {

    public static requiredParams: Array<string> = ["transactionTokenId", "amount", "currency", "period"]

    public static routeBase: string = "/stores/:storeId/subscriptions"

    public list(data?: SubscriptionsListParams,
                callback?: ResponseCallback<ResponseSubscriptions>,
                storeId?: string): Promise<ResponseSubscriptions> {

        return this.defineRoute("GET", "(/stores/:storeId)/subscriptions")(data, callback, ["storeId"], storeId)
    }

    public create(data: SubscriptionCreateParams,
                  callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this.defineRoute("POST", "/subscriptions", Subscriptions.requiredParams)(data, callback)
    }

    public get(storeId: string,
               id: string,
               data?: AuthParams,
               callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public update(storeId: string,
                  id: string,
                  data?: SubscriptionUpdateParams,
                  callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this._updateRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public delete(storeId: string,
                  id: string,
                  data?: AuthParams,
                  callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {

        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public charges(storeId: string,
                   id: string,
                   data?: ChargesListParams,
                   callback?: ResponseCallback<ResponseCharges>): Promise<ResponseCharges> {

        return this.defineRoute("GET", `${Subscriptions.routeBase}/:id/charges`)(
            data, callback, ["storeId", "id"], storeId, id
        )
    }

    public socket(storeId: string, id: string): WebSocket {
        const path: string = Resource.compilePath(`${this._routeBase}/:id`, { storeId, id })
        const url: string = this.api.getWebSocketUrl(path)
        return new WebSocket(url)
    }

    public poll(storeId: string,
                id: string,
                data?: AuthParams,
                callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {
        const promise: () => Promise<ResponseSubscription> = () => this._getRoute()(
            data, null, ["storeId", "id"], storeId, id
        )

        return this.api.longPolling(
            promise,
            (response: ResponseSubscription) => response.status !== "unverified",
            callback
        )
    }

}
