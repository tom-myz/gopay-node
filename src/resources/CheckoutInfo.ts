/**
 *  @module Resources/CheckoutInfo
 */

import { HTTPMethod, ResponseCallback, SendData } from "../api/RestAPI"
import { Resource } from "./Resource"
import { ProcessingMode } from "./common/enums"
import {
    CardConfigurationItem,
    ConvenienceConfigurationItem,
    PaidyConfigurationItem,
    QRScanConfigurationItem
} from "./common/Configuration"
import { AmountWithCurrency } from "./common/types";
import { RecurringTokenPrivilege } from "./TransactionTokens";

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
    paidyConfiguration: PaidyConfigurationItem,
    recurringCardChargeCvvConfirmation: {
        enabled?: boolean;
        threshold?: AmountWithCurrency[];
    }
    logoImage?: string
    theme: {
        colors: CheckoutColors
    }
}

export type ResponseCheckoutInfo = CheckoutInfoItem

export class CheckoutInfo extends Resource {

    get(data?: SendData<CheckoutInfoParams>, callback?: ResponseCallback<ResponseCheckoutInfo>): Promise<ResponseCheckoutInfo> {
        return this.defineRoute(HTTPMethod.GET, "/checkout_info")(data, callback)
    }

}
