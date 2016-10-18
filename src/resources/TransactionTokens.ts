import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"

/* Request */

export interface TransactionTokenCardData {
    cardholder: string
    cardNumber: string
    expMonth: number | string
    expYear: number | string
    cvv: string
    line1?: string
    line2?: string
    state?: string
    city?: string
    country?: string
    zip?: string
}

export interface TransactionTokenQRScanData {
    scannedQR: string
}

export interface TransactionTokenCreateParams extends AuthParams {
    paymentType: string
    subscription: boolean
    email: string
    amount: number
    currency: string
    data: TransactionTokenCardData | TransactionTokenQRScanData
}

/* Response */
export interface TransactionTokenCardDataItem {
    cardholder: string
    expMonth: number
    expYear: number
    lastFour: string
    brand: string
    line1?: string
    line2?: string
    state?: string
    city?: string
    country?: string
    zip?: string
}
export interface TransactionTokenQRScanDataItem {}


export interface TransactionTokenItem {
    storeId: string
    token: string
    active: boolean
    testMode: boolean
    subscription: boolean
    createdOn: number
    lastUsedOn: number
    data: TransactionTokenCardDataItem |TransactionTokenQRScanDataItem
}

export type ResponseTransactionToken = TransactionTokenItem

export class TransactionTokens extends CRUDResource {

    public static requiredParams: Array<string> = ["paymentType", "subscription", "email", "amount", "currency", "data"]

    public static routeBase: string = "/stores/:storeId/tokens"

    public create (data: TransactionTokenCreateParams,
                   callback?: ResponseCallback<ResponseTransactionToken>): Promise<ResponseTransactionToken> {
        return this.defineRoute("POST", "/tokens", TransactionTokens.requiredParams)(data, callback)
    }

    public get (storeId: string,
                id: string,
                data?: AuthParams,
                callback?: ResponseCallback<ResponseTransactionToken>): Promise<ResponseTransactionToken> {
        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public delete (storeId: string,
                   id: string,
                   data?: AuthParams,
                   callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {
        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

}
