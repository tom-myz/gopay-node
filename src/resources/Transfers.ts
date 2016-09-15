import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"

/* Request */
export interface TransfersListParams extends CRUDPaginationParams, AuthParams {}

/* Response */
export interface TransferItem {
    id: string
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
