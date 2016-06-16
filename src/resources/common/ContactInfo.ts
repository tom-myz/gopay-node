export interface ContactInfoCommonParams {
    phoneNumber?: string
    line1?: string
    line2?: string
    state?: string
    city?: string
    country?: string
    contry?: string
    zip?: string
}

export interface ContactInfoCreateParams extends ContactInfoCommonParams {}
export interface ContactInfoUpdateParams extends ContactInfoCommonParams {}
