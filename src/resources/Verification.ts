import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"
import { ContactInfo, ContactInfoPartial } from "./common/ContactInfo"
import { PhoneNumber } from "./common/PhoneNumber"

export interface BaseVerification<T> extends AuthParams {
    homepageUrl: string
    companyDescription: string
    companyContactInfo: T
    businessType: string
    systemManagerName: string
    systemManagerNumber?: PhoneNumber
    systemManagerEmail?: string
}

/* Request */
export interface VerificationCreateParams extends BaseVerification<ContactInfo> { }
export type VerificationUpdateParams = Partial<BaseVerification<ContactInfoPartial>>

/* Response */
export interface VerificationItem extends BaseVerification<ContactInfo> {
    id: string
    createdOn: number
}

export type ResponseVerification = VerificationItem

export class Verification extends CRUDResource {

    public static requiredParams: Array<string> = [
        "homepageUrl", "companyDescription", "companyContactInfo", "businessType", "systemManagerName"
    ]

    public static routeBase: string = "/verification"

    public create (data: VerificationCreateParams,
                   callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification> {

        return this._createRoute(Verification.requiredParams)(data, callback)
    }

    public get (data?: AuthParams, callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification> {
        return this.defineRoute("GET", this._routeBase)(data, callback)
    }

    public update (data?: VerificationUpdateParams,
                   callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification> {

        return this.defineRoute("PATCH", this._routeBase)(data, callback)
    }

}
