import { ResponseCallback, ErrorResponse, AuthParams, HTTPMethod } from "../api/RestAPI"
import { CRUDItemsResponse, CRUDPaginationParams, CRUDResource } from "./CRUDResource"
import { ProcessingMode } from "./common/ProcessingMode"
import { PhoneNumber } from "./common/PhoneNumber"
import { WithIdempotentKey } from "./common/Common"
import { CardBrand } from "./common/CardBrand"

export const enum UsageLimit {
    DAILY   = "daily",
    WEEKLY  = "weekly",
    MONTHLY = "monthly",
    YEARLY  = "yearly"
}

export const enum PaymentType {
    CARD      = "card",
    QR_SCAN   = "qr_scan",
    KONBINI   = "konbini",
    APPLE_PAY = "apple_pay"
}

export const enum ConvenienceStore {
    SEVEN_ELEVEN         = "seven_eleven",
    FAMILY_MART          = "family_mart",
    LAWSON               = "lawson",
    MINI_STOP            = "mini_stop",
    SEICO_MART           = "seico_mart",
    PAY_EASY             = "pay_easy",
    CIRCLE_K             = "circle_k",
    SUNKUS               = "sunkus",
    DAILY_YAMAZAKI       = "daily_yamazaki",
    YAMAZAKI_DAILY_STORE = "yamazaki_daily_store"
}

export const enum TransactionTokenType {
    ONE_TIME     = "one_time",
    SUBSCRIPTION = "subscription",
    RECURRING    = "recurring"
}

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
    phoneNumber?: PhoneNumber
}

export interface TransactionTokenQRScanData {
    scannedQR: string
}

export interface TransactionTokenConvenienceData {
    customerName: string
    convenienceStore: ConvenienceStore
    phoneNumber: PhoneNumber
}

export interface TransactionTokenCreateParams extends AuthParams, WithIdempotentKey {
    paymentType: PaymentType
    type: TransactionTokenType
    email: string
    usageLimit?: UsageLimit
    data: TransactionTokenCardData | TransactionTokenQRScanData | TransactionTokenConvenienceData
}

export interface TransactionTokenListParams extends CRUDPaginationParams, AuthParams {}

export interface TransactionTokenUpdateParams extends AuthParams {
    email?: string
}

/* Response */

export interface TransactionTokenCardDetails {
    cardholder: string
    expMonth: number
    expYear: number
    lastFour: string
    brand: CardBrand
    country?: string
}

export interface TransactionTokenCardBilling {
    line1?: string
    line2?: string
    state?: string
    city?: string
    country?: string
    zip?: string
    phoneNumber?: PhoneNumber
}

export interface TransactionTokenCardDataItem {
    card?: TransactionTokenCardDetails
    billing?: TransactionTokenCardBilling
}
export type TransactionTokenQRScanDataItem = object
export interface TransactionTokenConvenienceDataItem {
    convenienceStore?: ConvenienceStore
    customerName?: string
    expirationDate?: string
    phoneNumber?: PhoneNumber
}

export interface TransactionTokenItem {
    id: string
    storeId: string
    email: string
    mode: ProcessingMode
    createdOn: string
    lastUsedOn: string
    type: TransactionTokenType
    paymentType: PaymentType
    usageLimit?: UsageLimit
    data?: TransactionTokenCardDataItem | TransactionTokenQRScanDataItem | TransactionTokenConvenienceDataItem
}

export type ResponseTransactionToken = TransactionTokenItem
export type ResponseTransactionTokens = CRUDItemsResponse<TransactionTokenItem>

export class TransactionTokens extends CRUDResource {

    public static requiredParams: Array<string> = ["paymentType", "type", "email", "data"]

    public static routeBase: string = "(/stores/:storeId)/tokens"

    public create(data: TransactionTokenCreateParams,
                  callback?: ResponseCallback<ResponseTransactionToken>): Promise<ResponseTransactionToken> {
        return this.defineRoute(HTTPMethod.POST, "/tokens", TransactionTokens.requiredParams)(data, callback)
    }

    public get(id: string,
               data?: AuthParams,
               callback?: ResponseCallback<ResponseTransactionToken>,
               storeId?: string): Promise<ResponseTransactionToken> {
        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public list(data?: TransactionTokenListParams,
                callback?: ResponseCallback<ResponseTransactionTokens>,
                storeId?: string): Promise<ResponseTransactionTokens> {
        return this._listRoute()(data, callback, ["storeId"], storeId)
    }

    public update(id: string,
                  data?: TransactionTokenUpdateParams,
                  callback?: ResponseCallback<ResponseTransactionToken>,
                  storeId?: string): Promise<ResponseTransactionToken> {
        return this._updateRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    public delete(id: string,
                  data?: AuthParams,
                  callback?: ResponseCallback<ErrorResponse>,
                  storeId?: string): Promise<ErrorResponse> {
        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id)
    }
}
