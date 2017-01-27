import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"
import { ConfigurationItem } from "./common/Configuration"

/* Request */

/* Response */
export interface MerchantConfigurationItem extends ConfigurationItem {
    waitPeriod?: string
    transferPeriod?: string
}

export interface MerchantItem {
    id: string
    verificationDataId?: string
    name: string
    email: string
    roles: Array<string>
    verified: boolean
    createdOn: number
    configuration: MerchantConfigurationItem
}

export type ResponseMerchant = MerchantItem

export interface MerchantBanParams {
    reason: string
}

export class Merchants extends CRUDResource {

    public me (data?: AuthParams, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant> {
        return this.defineRoute("GET", "/me")(data, callback)
    }

}
