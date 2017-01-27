export interface PaymentTypeConfiguration {
    enabled?: boolean
}

export interface CardConfigurationItem extends PaymentTypeConfiguration {
    debitEnabled?: boolean
    prepaidEnabled?: boolean
}

export interface QRScanConfigurationItem extends PaymentTypeConfiguration {
}

export interface ConfigurationItem {
    cardConfiguration: CardConfigurationItem
    qrScanConfiguration: QRScanConfigurationItem
    percentFee?: number
    waitPeriod?: number
    transferPeriod?: string
    logoUrl?: string
}

export interface ConfigurationParams {
    logoUrl?: string
    cardConfiguration?: CardConfigurationItem
    qrScanConfiguration?: QRScanConfigurationItem
}

export interface ConfigurationCreateParams extends ConfigurationParams {}
export interface ConfigurationUpdateParams extends ConfigurationParams {}
