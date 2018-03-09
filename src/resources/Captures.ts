/**
 *  @module Resources/Captures
 */

import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource } from "./CRUDResource";

/* Request */

export interface CaptureCreateParams extends AuthParams {
    amount: number;
    currency: string;
}

/* Response */

export class Captures extends CRUDResource {

    static requiredParams: string[] = ["amount", "currency"];

    static routeBase: string = "/stores/:storeId/charges/:chargeId/capture";

    create(storeId: string,
           chargeId: string,
           data: CaptureCreateParams,
           callback?: ResponseCallback<any>): Promise<any> {

        return this._createRoute(Captures.requiredParams)(data, callback, ["storeId", "chargeId"], storeId, chargeId);
    }
}
