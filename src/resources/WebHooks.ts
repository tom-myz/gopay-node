import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

/* Request */
export interface WebHooksListParams extends CRUDPaginationParams, AuthParams {}
export interface WebHookCreateParams extends AuthParams {

}
export interface WebHookUpdateParams extends AuthParams {

}

/* Response */
export interface WebHookItem {
    id: string
}

export type ResponseWebHook = WebHookItem
export type ResponseWebHooks = CRUDItemsResponse<WebHookItem>

export class WebHooks extends CRUDResource {

    public static routeBase: string = "/stores/:storeId/webhooks"

    public list (storeId: string,
                 data?: WebHooksListParams,
                 callback?: ResponseCallback<ResponseWebHooks>): Promise<ResponseWebHooks> {

        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

    public create (storeId: string,
                   data: WebHookCreateParams,
                   callback?: ResponseCallback<ResponseWebHook>): Promise<ResponseWebHook> {

        return this._createRoute(["name"])(data, callback, ["storeId"], storeId)
    }

    public get (storeId: string,
                id: string,
                data?: AuthParams,
                callback?: ResponseCallback<ResponseWebHook>): Promise<ResponseWebHook> {

        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public update (storeId: string,
                   id: string,
                   data?: WebHookUpdateParams,
                   callback?: ResponseCallback<ResponseWebHook>): Promise<ResponseWebHook> {

        return this._updateRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public delete (storeId: string,
                   id: string,
                   data?: AuthParams,
                   callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {

        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

}
