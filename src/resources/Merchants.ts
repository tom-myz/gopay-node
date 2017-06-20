import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"
import { ConfigurationItem } from "./common/Configuration"

export type TransferPeriod = "weekly" | "biweekly" | "monthly"
/* Request */

/* Response */
export interface MerchantConfigurationItem extends ConfigurationItem {
    waitPeriod?: string
    transferPeriod?: TransferPeriod
}

export interface MerchantItem {
    id: string
    verificationDataId?: string
    name: string
    email: string
    roles: Array<string>
    verified: boolean
    createdOn: string
    configuration: MerchantConfigurationItem
}

export type ResponseMerchant = MerchantItem

export interface MerchantBanParams {
    reason: string
}

export class Merchants extends CRUDResource {

    public me(data?: AuthParams, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant> {
        return this.defineRoute("GET", "/me")(data, callback)
    }

}
