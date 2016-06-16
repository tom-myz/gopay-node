import { CRUDResource, CRUDIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { ContactInfoCommonParams } from "./common/ContactInfo"
import { GatewayCredentialsCommonParams } from "./common/GatewayCredentials"


export class Payouts extends CRUDResource {

    public routeBase: string = "/payouts"

    public list (data: CRUDPaginationParams, callback?: SDKCallbackFunction, token?: string) {
        return this._listRoute(null, data, callback, { token })
    }

}