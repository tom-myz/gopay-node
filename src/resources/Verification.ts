import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"

/* Request */
export interface VerificationCreateParams extends AuthParams {

}
export interface VerificationUpdateParams extends AuthParams {

}

/* Response */
export interface VerificationItem {
    id: string
}

export type ResponseVerification = VerificationItem

export class Verification extends CRUDResource {

    public static routeBase: string = "/verification"

    public create (data: VerificationCreateParams,
                   callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification> {

        return this._createRoute()(data, callback)
    }

    public get (data?: AuthParams, callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification> {
        return this.defineRoute("GET", this._routeBase)(data, callback)
    }

    public update (data?: VerificationUpdateParams,
                   callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification> {

        return this.defineRoute("PATCH", this._routeBase)(data, callback)
    }

}
