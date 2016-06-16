import { CRUDResource, CRUDIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { ContactInfoCommonParams } from "./common/ContactInfo"

export interface TokenCardData {
    cardholder: string
    cardNumber: string
    expMonth: number
    expYear: number
    cvv: string
    address?: ContactInfoCommonParams
}

export interface TransactionTokenCreateParams<A> {
    storeId: string
    token: string
    type: string
    data: A
}

export class TransactionTokens extends CRUDResource {

    public routeBase: string = "/tokens"

    public create (data: TransactionTokenCreateParams<any>, callback?: SDKCallbackFunction, token?: string) {
        return this._createRoute(null, data, callback, { token })
    }

    public get (id: string, callback?: SDKCallbackFunction, token?: string) {
        const params: CRUDIdParam = { id }
        return this._getRoute(params, null, callback, { token })
    }

    public delete (id: string, callback?: SDKCallbackFunction, token?: string) {
        const params: CRUDIdParam = { id }
        return this._updateRoute(params, null, callback, { token })
    }

}