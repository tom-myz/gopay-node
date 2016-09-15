import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"

/* Request */
export interface TransactionTokenCreateParams extends AuthParams {
    name: string
}

/* Response */
export interface TransactionTokenItem {
    id: string
}

export type ResponseTransactionToken = TransactionTokenItem

export class TransactionTokens extends CRUDResource {

    public static routeBase: string = "/tokens"

    public create (data: TransactionTokenCreateParams,
                   callback?: ResponseCallback<ResponseTransactionToken>): Promise<ResponseTransactionToken> {

        return this._createRoute()(data, callback)
    }

    public get (id: string,
                data?: AuthParams,
                callback?: ResponseCallback<ResponseTransactionToken>): Promise<ResponseTransactionToken> {

        return this._getRoute()(data, callback, ["id"], id)
    }

    public delete (id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {
        return this._deleteRoute()(data, callback, ["id"], id)
    }

}
