import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { Resource } from "./Resource"
import { ProcessingMode } from "./common/ProcessingMode"

/* Request */
export interface CheckoutInfoParams extends AuthParams {
    origin: string
}

/* Response */
export interface CheckoutColors {
    mainBackground: string
    secondaryBackground: string
    mainColor: string
    mainText: string
    primaryText: string
    secondaryText: string
}

export interface CheckoutInfoItem {
    mode: ProcessingMode
    subscriptions: boolean
    name: string
    paymentTypes: Array<string>
    logoImage?: string
    theme: {
        dark: boolean
        colors: CheckoutColors
    }
}

export type ResponseCheckoutInfo = CheckoutInfoItem

export class CheckoutInfo extends Resource {

    public get (data: CheckoutInfoParams, callback?: ResponseCallback<ResponseCheckoutInfo>): Promise<ResponseCheckoutInfo> {
        return this.defineRoute("GET", "/checkout_info", ["origin"])(data, callback)
    }

}
