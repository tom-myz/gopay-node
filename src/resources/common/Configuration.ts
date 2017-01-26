export interface ConfigurationItem {
    debitEnabled?: boolean
    prepaidEnabled?: boolean
    paymentTypes: Array<string>
    percentFee?: number
    waitPeriod?: string
    transferPeriod?: string
    logoUrl?: string
}

export interface ConfigurationParams {
    debitEnabled?: boolean
    logoUrl?: string
    prepaidEnabled?: boolean
    paymentTypes?: Array<string>
}

export interface ConfigurationCreateParams extends ConfigurationParams {}
export interface ConfigurationUpdateParams extends ConfigurationParams {}
