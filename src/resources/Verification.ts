import { ResponseCallback, AuthParams } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"
import { ContactInfo } from "./common/ContactInfo"

/* Request */
export interface VerificationCreateParams extends AuthParams {
    homepageUrl: string
    companyDescription: string
    companyContactInfo: ContactInfo
    businessType: string
    systemManagerName: string
    systemManagerNumber?: string
    systemManagerEmail?: string
}
export interface VerificationUpdateParams extends AuthParams {
    homepageUrl?: string
    companyDescription?: string
    companyContactInfo?: ContactInfo
    businessType?: string
    systemManagerName?: string
    systemManagerNumber?: string
    systemManagerEmail?: string
}

/* Response */
export interface VerificationItem {
    id: string
    homepageUrl: string
    companyDescription: string
    companyContactInfo: ContactInfo
    businessType: string
    systemManagerName: string
    systemManagerNumber?: string
    systemManagerEmail?: string
    createdOn: number
    updatedOn: number
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
