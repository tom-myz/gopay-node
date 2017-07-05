import { CardBrand } from "./CardBrand"

export interface PaymentTypeConfiguration {
    enabled?: boolean
}

export interface CardConfigurationItem extends PaymentTypeConfiguration {
    debitEnabled: boolean
    prepaidEnabled: boolean
    forbiddenCardBrands: Array<CardBrand>
    foreignCardsAllowed: boolean
    failOnNewEmail: boolean
    allowedCountriesByIp: Array<string>
}

export type QRScanConfigurationItem = PaymentTypeConfiguration

export interface ConfigurationItem {
    cardConfiguration: CardConfigurationItem
    qrScanConfiguration: QRScanConfigurationItem
    logoUrl?: string
}

export interface ConfigurationParams {
    logoUrl?: string
    cardConfiguration?: Partial<CardConfigurationItem>
    qrScanConfiguration?: Partial<QRScanConfigurationItem>
}

export type ConfigurationCreateParams = ConfigurationParams
export type ConfigurationUpdateParams = ConfigurationParams
