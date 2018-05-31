/**
 *  @module Resources/Merchants
 */

import { ResponseCallback, HTTPMethod, SendData } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"
import { ConfigurationItem } from "./common/Configuration"
import { RecurringTokenPrivilege } from "./TransactionTokens"
import { TransferScheduleItem } from "./common/TransferSchedule"

/* Request */

/* Response */
export interface RecurringTokenConfiguration {
    recurringType?: RecurringTokenPrivilege
    chargeWaitPeriod?: string
}

export interface MerchantConfigurationItem extends ConfigurationItem {
    waitPeriod?: string
    transferSchedule?: TransferScheduleItem
    recurringTokenConfiguration?: RecurringTokenConfiguration
    language?: string
    displayTimeZone?: string
}

export interface MerchantItem {
    id: string
    verificationDataId?: string
    name: string
    email: string
    verified: boolean
    createdOn: string
    configuration: MerchantConfigurationItem
}

export type ResponseMerchant = MerchantItem

export interface MerchantBanParams {
    reason: string
}

export class Merchants extends CRUDResource {

    me(data?: SendData<void>, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant> {
        return this.defineRoute(HTTPMethod.GET, "/me")(data, callback)
    }

}
