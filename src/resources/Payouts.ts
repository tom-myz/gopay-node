import { CRUDResource, CRUDIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"

export class Payouts extends CRUDResource {

    static routeBase: string = "/payouts"

    public list (data: CRUDPaginationParams, callback?: SDKCallbackFunction, token?: string) {
        return this._listRoute(null, data, callback, { token })
    }

}
