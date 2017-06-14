import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDSortingParams, CRUDItemsResponse } from "./CRUDResource"
import { Metadata } from "./common/Metadata"

export type TransferStatus = "created" | "approved" | "cancelled" | "processing" | "paid" | "failed"

/* Request */
export type TransfersSortBy = "createdOn"

export interface TransfersListParams extends CRUDPaginationParams, CRUDSortingParams<TransfersSortBy>, AuthParams {
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
    createdOn: number
    from: number
    to: number
}

export interface TransferStatusChangeItem {
    id: string
    merchantId: string
    transferId: string
    oldStatus: TransferStatus
    newStatus: TransferStatus
    reason?: string
    createdOn: number
}

export type ResponseTransfer = TransferItem
export type ResponseTransfers = CRUDItemsResponse<TransferItem>
export type ResponseTransferStatusChanges = CRUDItemsResponse<TransferStatusChangeItem>

export class Transfers extends CRUDResource {

    public static routeBase: string = "/transfers"

    public list(data?: TransfersListParams, callback?: ResponseCallback<ResponseTransfers>): Promise<ResponseTransfers> {
        return this._listRoute()(data, callback)
    }

    public get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseTransfer>): Promise<ResponseTransfer> {
        return this._getRoute()(data, callback, ["id"], id)
    }

    public statusChanges(id: string,
                         data?: AuthParams,
                         callback?: ResponseCallback<ResponseTransferStatusChanges>): Promise<ResponseTransferStatusChanges> {
        return this.defineRoute("GET", `${Transfers.routeBase}/:id/status_changes`)(data, callback, ["id"], id)
    }

}
