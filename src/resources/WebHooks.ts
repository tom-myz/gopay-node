/**
 *  @module Resources/WebHooks
 */

import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

export const enum WebHookTrigger {
    // Store
    CHARGE_FINISHED       = "charge_finished",
    CHARGE_UPDATED        = "charge_updated",
    SUBSCRIPTION_PAYMENT  = "subscription_payment",
    SUBSCRIPTION_FAILURE  = "subscription_failure",
    SUBSCRIPTION_CANCELED = "subscription_canceled",
    REFUND_FINISHED       = "refund_finished",
    CANCEL_FINISHED       = "cancel_finished",

    // Merchant
    TRANSFER_FINALIZED    = "transfer_finalized"
}

/* Request */
export interface WebHooksListParams extends CRUDPaginationParams, AuthParams {}

export interface WebHookCreateParams extends AuthParams {
    triggers: WebHookTrigger[]
    url: string
}
export interface WebHookUpdateParams extends AuthParams {
    triggers?: WebHookTrigger[]
    url?: string
}

/* Response */
export interface WebHookItem {
    id: string
    merchantId: string
    storeId: string
    triggers: WebHookTrigger[]
    url: string
    createdOn: string
}

export type ResponseWebHook = WebHookItem
export type ResponseWebHooks = CRUDItemsResponse<WebHookItem>

export class WebHooks extends CRUDResource {

    static requiredParams: string[] = ["triggers", "url"]

    static routeBase: string = "(/stores/:storeId)/webhooks"

    list(data?: WebHooksListParams,
         callback?: ResponseCallback<ResponseWebHooks>,
         storeId?: string): Promise<ResponseWebHooks> {

        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

    create(data: WebHookCreateParams,
           callback?: ResponseCallback<ResponseWebHook>,
           storeId?: string): Promise<ResponseWebHook> {

        return this._createRoute(WebHooks.requiredParams)(data, callback, ["storeId"], storeId)
    }

    get(id: string,
        data?: AuthParams,
        callback?: ResponseCallback<ResponseWebHook>,
        storeId?: string): Promise<ResponseWebHook> {

        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    update(id: string,
           data?: WebHookUpdateParams,
           callback?: ResponseCallback<ResponseWebHook>,
           storeId?: string): Promise<ResponseWebHook> {

        return this._updateRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    delete(id: string,
           data?: AuthParams,
           callback?: ResponseCallback<ErrorResponse>,
           storeId?: string): Promise<ErrorResponse> {

        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

}
