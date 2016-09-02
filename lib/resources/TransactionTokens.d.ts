import { CRUDResource } from "./CRUDResource";
import { SDKCallbackFunction } from "../api/RestAPI";
import { ContactInfoParams } from "./common/ContactInfo";
export interface TokenCardData {
    cardholder: string;
    cardNumber: string;
    expMonth: number;
    expYear: number;
    cvv: string;
    address?: ContactInfoParams;
}
export interface TransactionTokenCreateParams<A> {
    type: string;
    data: A;
}
export declare class TransactionTokens extends CRUDResource {
    static routeBase: string;
    create(data: TransactionTokenCreateParams<any>, callback?: SDKCallbackFunction): Promise<any>;
    get(id: string, callback?: SDKCallbackFunction, token?: string): Promise<any>;
    delete(id: string, callback?: SDKCallbackFunction, token?: string): Promise<any>;
}
