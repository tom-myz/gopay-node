import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { Resource } from "./Resource"

/* Request */

/* Response */
export interface CheckoutInfoItem {
    id: string
}

export type ResponseCheckoutInfo = CheckoutInfoItem

export class CheckoutInfo extends Resource {

    public get (data?: AuthParams, callback?: ResponseCallback<ResponseCheckoutInfo>): Promise<ResponseCheckoutInfo> {
        return this.defineRoute("GET", "/checkout_info")(data, callback)
    }

}
