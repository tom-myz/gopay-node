/**
 *  @module Resources/CheckoutInfo
 */

import { ResponseCallback, HTTPMethod, SendData } from "../api/RestAPI"
import { Resource } from "./Resource"
import { ProcessingMode } from "./common/enums"
import { RecurringTokenPrivilege } from "./TransactionTokens"
import { CardConfigurationItem, ConvenienceConfigurationItem, QRScanConfigurationItem } from "./common/Configuration"

/* Request */
export interface CheckoutInfoParams {
    // @deprecated
    origin?: string
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
    convenienceConfiguration: ConvenienceConfigurationItem
    logoImage?: string
    theme: {
        colors: CheckoutColors
    }
}

export type ResponseCheckoutInfo = CheckoutInfoItem

export class CheckoutInfo extends Resource {

    get(data: SendData<CheckoutInfoParams>, callback?: ResponseCallback<ResponseCheckoutInfo>): Promise<ResponseCheckoutInfo> {
        return this.defineRoute(HTTPMethod.GET, "/checkout_info")(data, callback)
    }

}
