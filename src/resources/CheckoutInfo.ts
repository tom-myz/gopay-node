import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { Resource } from "./Resource"
import { ProcessingMode } from "./common/ProcessingMode"
import { RecurringTokenPrivilege } from "../../lib/resources/Verification";
import { CardConfigurationItem, QRScanConfigurationItem } from "../../lib/resources/common/Configuration";

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
    baseText: string
}

export interface CheckoutInfoItem {
    mode: ProcessingMode
    recurringTokenPrivilege: RecurringTokenPrivilege
    name: string
    cardConfiguration: CardConfigurationItem
    qrScanConfiguration: QRScanConfigurationItem
    logoImage?: string
    theme: {
        dark: boolean
        colors: CheckoutColors
    }
}

export type ResponseCheckoutInfo = CheckoutInfoItem

export class CheckoutInfo extends Resource {

    public get(data: CheckoutInfoParams, callback?: ResponseCallback<ResponseCheckoutInfo>): Promise<ResponseCheckoutInfo> {
        return this.defineRoute("GET", "/checkout_info", ["origin"])(data, callback)
    }

}
