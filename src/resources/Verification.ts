/**
 *  @module Resources/Verification
 */

import { ResponseCallback, AuthParams, HTTPMethod } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"
import { ContactInfo, ContactInfoPartial } from "./common/ContactInfo"
import { PhoneNumber } from "./common/types"

export const enum RecurringTokenPrivilege {
    NONE     = "none",
    BOUNDED  = "bounded",
    INFINITE = "infinite"
}

export interface BaseVerification<T> extends AuthParams {
    homepageUrl: string
    companyDescription: string
    companyContactInfo: T
    businessType: string
    systemManagerName: string
    systemManagerNumber?: PhoneNumber
    systemManagerEmail?: string
    recurringTokenRequest?: RecurringTokenPrivilege
    recurringTokenRequestReason?: string
    allowEmptyCvv?: boolean
}

/* Request */
export type VerificationCreateParams = BaseVerification<ContactInfo>
export type VerificationUpdateParams = Partial<BaseVerification<ContactInfoPartial>>

/* Response */
export interface VerificationItem extends BaseVerification<ContactInfo> {
    id: string
    createdOn: string
}

export type ResponseVerification = VerificationItem

export class Verification extends CRUDResource {

    static requiredParams: string[] = [
        "homepageUrl", "companyDescription", "companyContactInfo", "businessType", "systemManagerName"
    ]

    static routeBase: string = "/verification"

    create(data: VerificationCreateParams,
           callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification> {

        return this._createRoute(Verification.requiredParams)(data, callback)
    }

    get(data?: AuthParams, callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification> {
        return this.defineRoute(HTTPMethod.GET, this._routeBase)(data, callback)
    }

    update(data?: VerificationUpdateParams,
           callback?: ResponseCallback<ResponseVerification>): Promise<ResponseVerification> {
        return this.defineRoute(HTTPMethod.PATCH, this._routeBase)(data, callback)
    }

}
