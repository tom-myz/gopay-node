import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"
import { ConfigurationItem } from "./common/Configuration"

/* Request */

/* Response */
export interface MerchantItem {
    id: string
    verificationDataId?: string
    name: string
    email: string
    active: boolean
    roles: Array<string>
    verified: boolean
    createdOn: number
    updatedOn: number
    configuration: ConfigurationItem
}

export type ResponseMerchant = MerchantItem

export class Merchants extends CRUDResource {

    public me (data?: AuthParams, callback?: ResponseCallback<ResponseMerchant>): Promise<ResponseMerchant> {
        return this.defineRoute("GET", "/me")(data, callback)
    }

}
