import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { Metadata } from "./common/Metadata"

/* Request */
export interface TransfersListParams extends CRUDPaginationParams, AuthParams {}

/* Response */
export interface TransferItem {
    id: string
    bankAccountId: string
    amount: number
    currency: string
    amountFormatted: number
    status: string
    errorCode?: string
    errorText?: string
    metadata?: Metadata
    startedBy: string
    createdOn: number
    updatedOn: number
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
