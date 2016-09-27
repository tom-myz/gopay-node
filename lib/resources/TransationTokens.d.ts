import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI";
import { CRUDResource } from "./CRUDResource";
export interface TransactionTokenCreateParams extends AuthParams {
    name: string;
}
export interface TransactionTokenItem {
    id: string;
}
export declare type ResponseTransactionToken = TransactionTokenItem;
export declare class TransactionTokens extends CRUDResource {
    static routeBase: string;
    create(data: TransactionTokenCreateParams, callback?: ResponseCallback<ResponseTransactionToken>): Promise<ResponseTransactionToken>;
    get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseTransactionToken>): Promise<ResponseTransactionToken>;
    delete(id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse>;
}
