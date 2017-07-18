import { CardBrand } from "./CardBrand"

export interface PaymentTypeConfiguration {
    enabled?: boolean
}

export interface CardBrandPercentFeesItem {
    americanExpress: number
    dinersClub: number
    discover: number
    jcb: number
    maestro: number
    mastercard: number
    unionPay: number
    visa: number
}

export interface CardConfigurationMonthlyLimit {
    amount: number
    currency: string
}

export interface CardConfigurationItem extends PaymentTypeConfiguration {
    debitEnabled: boolean
    prepaidEnabled: boolean
    forbiddenCardBrands: Array<CardBrand>
    foreignCardsAllowed: boolean
    failOnNewEmail: boolean
    allowedCountriesByIp: Array<string>
    monthlyLimit: CardConfigurationMonthlyLimit
}

export type QRScanConfigurationItem = PaymentTypeConfiguration

export interface ConfigurationItem {
    cardBrandPercentFees: CardBrandPercentFeesItem
    cardConfiguration: CardConfigurationItem
    qrScanConfiguration: QRScanConfigurationItem
    flatFeeAmount: number
    flatFeeCurrency: string
    percentFee: number
    logoUrl?: string
}

export interface ConfigurationParams {
    logoUrl?: string
    cardConfiguration?: Partial<CardConfigurationItem>
    qrScanConfiguration?: Partial<QRScanConfigurationItem>
}

export type ConfigurationCreateParams = ConfigurationParams
export type ConfigurationUpdateParams = ConfigurationParams
