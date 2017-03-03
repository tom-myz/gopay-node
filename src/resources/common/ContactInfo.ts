import { PhoneNumber } from "./PhoneNumber"

export interface ContactInfo {
    name?: string
    companyName?: string
    phoneNumber?: string | PhoneNumber
    line1?: string
    line2?: string
    city?: string
    state?: string
    country?: string
    zip?: string
}
