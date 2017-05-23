import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"
import { ProcessingMode } from "./common/ProcessingMode"
import { PhoneNumber } from "./common/PhoneNumber"

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
    phoneNumer?: PhoneNumber
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

export interface TransactionTokenCardDetails {
    cardholder: string
    expMonth: number
    expYear: number
    lastFour: string
    brand: string
    country?: string
}

export interface TransactionTokenCardBilling {
    line1?: string
    line2?: string
    state?: string
    city?: string
    country?: string
    zip?: string
    phoneNumer?: PhoneNumber
}

export interface TransactionTokenCardDataItem {
    card?: TransactionTokenCardDetails
    billing?: TransactionTokenCardBilling
}
export type TransactionTokenQRScanDataItem = object

export type TransactionTokenType = "ontime" | "subscription" | "recurring"

export interface TransactionTokenItem {
    id: string
    storeId: string
    email: string
    mode: ProcessingMode
    subscription: boolean
    createdOn: number
    lastUsedOn: number
    type: TransactionTokenType
    paymentType: string
    data: TransactionTokenCardDataItem | TransactionTokenQRScanDataItem
}

export type ResponseTransactionToken = TransactionTokenItem

export class TransactionTokens extends CRUDResource {

    public static requiredParams: Array<string> = ["paymentType", "subscription", "email", "amount", "currency", "data"]

    public static routeBase: string = "/stores/:storeId/tokens"

    public create(data: TransactionTokenCreateParams,
                  callback?: ResponseCallback<ResponseTransactionToken>): Promise<ResponseTransactionToken> {
        return this.defineRoute("POST", "/tokens", TransactionTokens.requiredParams)(data, callback)
    }

    public get(storeId: string,
               id: string,
               data?: AuthParams,
               callback?: ResponseCallback<ResponseTransactionToken>): Promise<ResponseTransactionToken> {
        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

}
