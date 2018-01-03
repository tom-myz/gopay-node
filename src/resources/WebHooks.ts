import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

export const enum WebHookTrigger {
    // Store
    CHARGE_FINISHED       = "charge_finished",
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
    triggers: Array<WebHookTrigger>
    url: string
}
export interface WebHookUpdateParams extends AuthParams {
    triggers?: Array<WebHookTrigger>
    url?: string
}

/* Response */
export interface WebHookItem {
    id: string
    merchantId: string
    storeId: string
    triggers: Array<WebHookTrigger>
    url: string
    createdOn: string
}

export type ResponseWebHook = WebHookItem
export type ResponseWebHooks = CRUDItemsResponse<WebHookItem>

export class WebHooks extends CRUDResource {

    public static requiredParams: Array<string> = ["triggers", "url"]

    public static routeBase: string = "(/stores/:storeId)/webhooks"

    public list(data?: WebHooksListParams,
                callback?: ResponseCallback<ResponseWebHooks>,
                storeId?: string): Promise<ResponseWebHooks> {

        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

    public create(data: WebHookCreateParams,
                  callback?: ResponseCallback<ResponseWebHook>,
                  storeId?: string): Promise<ResponseWebHook> {

        return this._createRoute(WebHooks.requiredParams)(data, callback, ["storeId"], storeId)
    }

    public get(id: string,
               data?: AuthParams,
               callback?: ResponseCallback<ResponseWebHook>,
               storeId?: string): Promise<ResponseWebHook> {

        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public update(id: string,
                  data?: WebHookUpdateParams,
                  callback?: ResponseCallback<ResponseWebHook>,
                  storeId?: string): Promise<ResponseWebHook> {

        return this._updateRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public delete(id: string,
                  data?: AuthParams,
                  callback?: ResponseCallback<ErrorResponse>,
                  storeId?: string): Promise<ErrorResponse> {

        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

}
