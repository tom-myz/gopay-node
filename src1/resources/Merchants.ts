import { ResponseCallback, ErrorResponse } from "../api/RestAPI"
import { DefinedRoute } from "./Resource"
import { CRUDResource, CRUDIdParam } from "./CRUDResource"

export interface MerchantItem {
    id: string
}

export type ResponseMerchant = MerchantItem | ErrorResponse

export class Merchants extends CRUDResource {

    public static routeBase: string = "/merchants"
    
    public me (callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant> {
        return this.defineRoute("GET", `${this._routeBase}/me`)(null, callback)
    }

}