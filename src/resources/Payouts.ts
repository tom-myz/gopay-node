import { CRUDResource, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"

export class Payouts extends CRUDResource {

    public static routeBase: string = "/payouts"

    public list (data: CRUDPaginationParams, callback?: SDKCallbackFunction, token?: string): Promise<any> {
        return this._listRoute(null, data, callback, { token })
    }

}
