import { ResponseCallback, ErrorResponse, AuthParams } from "../api/RestAPI";
import { CRUDResource } from "./CRUDResource";
export interface TransactionTokenCardData {
    cardholder: string;
    cardNumber: string;
    expMonth: number | string;
    expYear: number | string;
    cvv: string;
    line1?: string;
    line2?: string;
    state?: string;
    city?: string;
    country?: string;
    zip?: string;
}
export interface TransactionTokenQRScanData {
    scannedQR: string;
}
export interface TransactionTokenCreateParams extends AuthParams {
    paymentType: string;
    subscription: boolean;
    email: string;
    amount: number;
    currency: string;
    data: TransactionTokenCardData | TransactionTokenQRScanData;
}
export interface TransactionTokenCardDataItem {
    cardholder: string;
    expMonth: number;
    expYear: number;
    lastFour: string;
    brand: string;
    line1?: string;
    line2?: string;
    state?: string;
    city?: string;
    country?: string;
    zip?: string;
}
export interface TransactionTokenQRScanDataItem {
}
export interface TransactionTokenItem {
    storeId: string;
    token: string;
    active: boolean;
    testMode: boolean;
    subscription: boolean;
    createdOn: number;
    lastUsedOn: number;
    data: TransactionTokenCardDataItem | TransactionTokenQRScanDataItem;
}
export declare type ResponseTransactionToken = TransactionTokenItem;
export declare class TransactionTokens extends CRUDResource {
    static requiredParams: Array<string>;
    static routeBase: string;
    create(data: TransactionTokenCreateParams, callback?: ResponseCallback<ResponseTransactionToken>): Promise<ResponseTransactionToken>;
    get(id: string, data?: AuthParams, callback?: ResponseCallback<ResponseTransactionToken>): Promise<ResponseTransactionToken>;
    delete(id: string, data?: AuthParams, callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse>;
}
