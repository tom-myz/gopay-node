import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { Resource } from "./Resource"
import { ProcessingMode } from "./common/ProcessingMode"

/* Response */
export interface CheckoutInfoItem {
    mode: ProcessingMode
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
