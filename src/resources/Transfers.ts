/**
 *  @module Resources/Transfers
 */

import { ResponseCallback, AuthParams, HTTPMethod } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { Metadata } from "./common/types"

export enum TransferStatus {
    CREATED    = "created",
    APPROVED   = "approved",
    CANCELED   = "canceled",
    PROCESSING = "processing",
    PAID       = "paid",
    FAILED     = "failed"
}

/* Request */
export interface TransfersListParams extends CRUDPaginationParams, AuthParams {
    currency?: string
    status?: TransferStatus
    startedBy?: string
}

/* Response */
export interface TransferItem {
    id: string
    merchantId: string
    bankAccountId: string
    amount: number
    currency: string
    amountFormatted: number
    status: TransferStatus
    errorCode?: string
    errorText?: string
    metadata?: Metadata
    startedBy: string
    createdOn: string
    from: string
    to: string
}

export interface TransferStatusChangeItem {
    id: string
    merchantId: string
    transferId: string
    oldStatus: TransferStatus
    newStatus: TransferStatus
    reason?: string
    createdOn: string
}

export type ResponseTransfer = TransferItem
export type ResponseTransfers = CRUDItemsResponse<TransferItem>
export type ResponseTransferStatusChanges = CRUDItemsResponse<TransferStatusChangeItem>

export class Transfers extends CRUDResource {

    static routeBase: string = "/transfers"

    list(data?: TransfersListParams, callback?: ResponseCallback<ResponseTransfers>): Promise<ResponseTransfers> {
        return this._listRoute()(data, callback)
    }

    get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseTransfer>): Promise<ResponseTransfer> {
        return this._getRoute()(data, callback, ["id"], id)
    }

    statusChanges(id: string,
                  data?: AuthParams,
                  callback?: ResponseCallback<ResponseTransferStatusChanges>): Promise<ResponseTransferStatusChanges> {
        return this.defineRoute(HTTPMethod.GET, `${Transfers.routeBase}/:id/status_changes`)(data, callback, ["id"], id)
    }

}
