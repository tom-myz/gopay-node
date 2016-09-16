import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { Resource } from "./Resource"

/* Response */
export interface CheckoutInfoItem {
    testMode: boolean
    subscriptions: boolean
    name: string
    paymentTypes: Array<string>
    logoImage?: string
    theme: {
        dark: boolean
        color: Array<string>
    }
}

export type ResponseCheckoutInfo = CheckoutInfoItem

export class CheckoutInfo extends Resource {

    public get (data?: AuthParams, callback?: ResponseCallback<ResponseCheckoutInfo>): Promise<ResponseCheckoutInfo> {
        return this.defineRoute("GET", "/checkout_info")(data, callback)
    }

}
