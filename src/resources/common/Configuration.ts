import { CardBrand } from "./CardBrand"
import { AmountWithCurrency } from "./Common"

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

export interface CardConfigurationMonthlyLimit extends AmountWithCurrency { }

export interface CardConfigurationItem extends PaymentTypeConfiguration {
    debitEnabled: boolean
    prepaidEnabled: boolean
    forbiddenCardBrands: Array<CardBrand>
    foreignCardsAllowed: boolean
    failOnNewEmail: boolean
    allowedCountriesByIp: Array<string>
    cardLimit: CardConfigurationMonthlyLimit
    allowEmptyCvv: boolean
}

export type QRScanConfigurationItem = PaymentTypeConfiguration

export type ConvenienceConfigurationItem = PaymentTypeConfiguration

export interface SecurityConfiguration {
    inspectSuspiciousLoginAfter?: string
    limitChargeByCardConfiguration?: {
        quantityOfCharges: number
        durationWindow: string
    }
    refundPercentLimit?: number
}

export interface ConfigurationItem {
    cardBrandPercentFees: CardBrandPercentFeesItem
    cardConfiguration: CardConfigurationItem
    qrScanConfiguration: QRScanConfigurationItem
    convenienceConfiguration: ConvenienceConfigurationItem
    flatFees: Array<AmountWithCurrency>
    percentFee: number
    logoUrl?: string
    securityConfiguration?: SecurityConfiguration
}

export interface ConfigurationParams {
    logoUrl?: string
    cardConfiguration?: Partial<CardConfigurationItem>
    qrScanConfiguration?: Partial<QRScanConfigurationItem>
    convenienceConfiguration?: Partial<ConvenienceConfigurationItem>
}

export type ConfigurationCreateParams = ConfigurationParams
export type ConfigurationUpdateParams = ConfigurationParams
