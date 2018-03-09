/**
 *  @module Resources/Cancels
 */

import {ResponseCallback, AuthParams, PollParams} from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
import { PaymentError, Metadata } from "./common/types";
import { ProcessingMode } from "./common/enums";

export const enum CancelStatus {
    PENDING    = "pending",
    SUCCESSFUL = "successful",
    FAILED     = "failed",
    ERROR      = "error"
}

/* Request */
export interface CancelsListParams extends CRUDPaginationParams, AuthParams {}

export interface CancelCreateParams extends AuthParams {
    metadata?: Metadata;
}

/* Response */
export interface CancelItem {
    id: string;
    chargeId: string;
    storeId?: string;
    status: CancelStatus;
    error?: PaymentError;
    metadata?: Metadata;
    mode: ProcessingMode;
    createdOn: string;
}

export type ResponseCancel = CancelItem;
export type ResponseCancels = CRUDItemsResponse<CancelItem>;

export class Cancels extends CRUDResource {

    static requiredParams: string[] = [];

    static routeBase: string = "/stores/:storeId/charges/:chargeId/cancels";

    list(storeId: string,
         chargeId: string,
         data?: CancelsListParams,
         callback?: ResponseCallback<ResponseCancels>): Promise<ResponseCancels> {

        return this._listRoute()(data, callback, ["storeId", "chargeId"], storeId, chargeId);
    }

    create(storeId: string,
           chargeId: string,
           data: CancelCreateParams,
           callback?: ResponseCallback<ResponseCancel>): Promise<ResponseCancel> {

        return this._createRoute(Cancels.requiredParams)(data, callback, ["storeId", "chargeId"], storeId, chargeId);
    }

    get(storeId: string,
        chargeId: string,
        id: string,
        data?: AuthParams & Partial<PollParams>,
        callback?: ResponseCallback<ResponseCancel>): Promise<ResponseCancel> {

        return this._getRoute()(data, callback, ["storeId", "chargeId", "id"], storeId, chargeId, id);
    }

    poll(storeId: string,
         chargeId: string,
         id: string,
         data?: AuthParams,
         callback?: ResponseCallback<ResponseCancel>): Promise<ResponseCancel> {
        const promise: () => Promise<ResponseCancel> = () => this.get(
            storeId,
            chargeId,
            id,
            { ...data, poll : true }
        );
        return this.api.longPolling(
            promise,
            (response: ResponseCancel) => response.status !== CancelStatus.PENDING,
            callback
        );
    }

}
