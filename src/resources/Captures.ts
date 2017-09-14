import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { PaymentError } from "./common/PaymentError"
import { Metadata } from "./common/Metadata"
import { ProcessingMode } from "./common/ProcessingMode"

/* Request */

export interface CaptureCreateParams extends AuthParams {
    amount: number
    currency: string
}

/* Response */

export class Captures extends CRUDResource {

    public static requiredParams: Array<string> = ["amount", "currency"]

    public static routeBase: string = "/stores/:storeId/charges/:chargeId/capture"

    public create(storeId: string,
                  chargeId: string,
                  data: CaptureCreateParams,
                  callback?: ResponseCallback<any>): Promise<any> {

        return this._createRoute(Captures.requiredParams)(data, callback, ["storeId", "chargeId"], storeId, chargeId)
    }
}
