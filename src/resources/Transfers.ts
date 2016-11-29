import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDSortingParams, CRUDItemsResponse } from "./CRUDResource"
import { Metadata } from "./common/Metadata"

export type TransferStatus = "pending" | "in_transfer" | "paid" | "cancelled" | "failed"

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

export type ResponseTransfer = TransferItem
export type ResponseTransfers = CRUDItemsResponse<TransferItem>

export class Transfers extends CRUDResource {

    public static routeBase: string = "/transfers"

    public list (data?: TransfersListParams, callback?: ResponseCallback<ResponseTransfers>): Promise<ResponseTransfers> {
        return this._listRoute()(data, callback)
    }

    public get (id: string, data?: AuthParams, callback?: ResponseCallback<ResponseTransfer>): Promise<ResponseTransfer> {
        return this._getRoute()(data, callback, ["id"], id)
    }

}
