import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { Resource } from "./Resource"

/* Request */

/* Response */
export interface MerchantItem {
    id: string
}

export type ResponseMerchant = MerchantItem

export class Merchants extends Resource {

    public me (data?: AuthParams, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant> {
        return this.defineRoute("GET", "/me")(data, callback)
    }

}
