/**
 *  @module Resources/Subscriptions
 */

import { ResponseCallback, AuthParams, ErrorResponse, PollParams, HTTPMethod } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { Metadata, WithIdempotentKey } from "./common/types"
import { ProcessingMode } from "./common/enums"
import { ResponseCharges, ChargesListParams } from "./Charges"

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
    CANCELED    = "canceled",
    UNCONFIRMED = "unconfirmed",
    COMPLETED   = "completed"
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

    static requiredParams: string[] = ["transactionTokenId", "amount", "currency", "period"];

    static routeBase: string = "/stores/:storeId/subscriptions";

    list(data?: SubscriptionsListParams,
         callback?: ResponseCallback<ResponseSubscriptions>,
         storeId?: string): Promise<ResponseSubscriptions> {

        return this.defineRoute(HTTPMethod.GET, "(/stores/:storeId)/subscriptions")(data, callback, ["storeId"], storeId)
    }

    create(data: SubscriptionCreateParams,
           callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this.defineRoute(HTTPMethod.POST, "/subscriptions", Subscriptions.requiredParams)(data, callback)
    }

    get(storeId: string,
        id: string,
        data?: AuthParams & Partial<PollParams>,
        callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    update(storeId: string,
           id: string,
           data?: SubscriptionUpdateParams,
           callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this._updateRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    delete(storeId: string,
           id: string,
           data?: AuthParams,
           callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {

        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    charges(storeId: string,
            id: string,
            data?: ChargesListParams,
            callback?: ResponseCallback<ResponseCharges>): Promise<ResponseCharges> {

        return this.defineRoute(HTTPMethod.GET, `${Subscriptions.routeBase}/:id/charges`)(
            data, callback, ["storeId", "id"], storeId, id
        )
    }

    poll(storeId: string,
         id: string,
         data?: AuthParams,
         callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {
        const promise: () => Promise<ResponseSubscription> = () => this.get(
            storeId,
            id,
            { ...data, poll : true }
        )
        return this.api.longPolling(
            promise,
            (response: ResponseSubscription) => response.status !== SubscriptionStatus.UNVERIFIED,
            callback
        )
    }

}
