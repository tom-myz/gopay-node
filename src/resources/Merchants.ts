import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"

/* Request */

/* Response */
export interface MerchantItem {
    id: string
}

export type ResponseMerchant = MerchantItem

export class Merchants extends CRUDResource {

    public me (data?: AuthParams, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant> {
        return this.defineRoute("GET", "/me")(data, callback)
    }

}
