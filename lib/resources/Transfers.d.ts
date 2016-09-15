import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource";
export interface TransfersListParams extends CRUDPaginationParams, AuthParams {
}
export interface TransferItem {
    id: string;
}
export declare type ResponseTransfer = TransferItem;
export declare type ResponseTransfers = CRUDItemsResponse<TransferItem>;
export declare class Transfers extends CRUDResource {
    static routeBase: string;
    list(data?: TransfersListParams, callback?: ResponseCallback<ResponseTransfers>): Promise<ResponseTransfers>;
    get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseTransfer>): Promise<ResponseTransfer>;
}
