import { CRUDResource, CRUDIdParam } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { ContactInfoParams } from "./common/ContactInfo"
import { getTransactionTokenSchema } from "../validation/schemas/transaction-token"

export interface TokenCardData {
    cardholder: string
    cardNumber: string
    expMonth: number
    expYear: number
    cvv: string
    address?: ContactInfoParams
}

export interface TransactionTokenCreateParams<A> {
    type: string
    data: A
}

export class TransactionTokens extends CRUDResource {

    public static routeBase: string = "/tokens"

    public create (data: TransactionTokenCreateParams<any>,
                   callback?: SDKCallbackFunction): Promise<any> {
        const validationSchema: any = getTransactionTokenSchema(data.type)
        return this._createRoute(null, data, callback, { validationSchema })
    }

    public get (id: string, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        const params: CRUDIdParam = { id }
        return this._getRoute(params, null, callback, { token })
    }

    public delete (id: string, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        const params: CRUDIdParam = { id }
        return this._deleteRoute(params, null, callback, { token })
    }

}
