/**
 *  @internal
 *  @module Types
 */

import { CardBrand } from "./enums";
import { AmountWithCurrency } from "./types";
import { RecurringTokenPrivilege } from "../TransactionTokens";

export interface PaymentTypeConfiguration {
    enabled?: boolean;
}

export interface CardBrandPercentFeesItem {
    americanExpress?: number;
    dinersClub?: number;
    discover?: number;
    jcb?: number;
    maestro?: number;
    mastercard?: number;
    unionPay?: number;
    visa?: number;
}

export interface CardConfigurationMonthlyLimit extends AmountWithCurrency { }

export interface CardConfigurationItem extends PaymentTypeConfiguration {
    debitEnabled: boolean;
    prepaidEnabled: boolean;
    forbiddenCardBrands: Array<CardBrand>;
    foreignCardsAllowed: boolean;
    failOnNewEmail: boolean;
    allowedCountriesByIp: Array<string>;
    cardLimit: CardConfigurationMonthlyLimit;
    allowEmptyCvv: boolean;
}

export type QRScanConfigurationItem = PaymentTypeConfiguration;

export type ConvenienceConfigurationItem = PaymentTypeConfiguration;

export interface InstallmentsConfiguration {
    minChargeAmount?: number;
    maxPayoutPeriod?: string;
    failedCyclesToCancel?: number;
}

export interface InstallmentsConfigurationItem extends PaymentTypeConfiguration, InstallmentsConfiguration { }

export interface SecurityConfiguration {
    inspectSuspiciousLoginAfter?: string;
    limitChargeByCardConfiguration?: {
        quantityOfCharges: number;
        durationWindow: string;
    }
    refundPercentLimit?: number;
}

export interface UserTransactionsConfiguration {
    enabled?: boolean
    notifyCustomer?: boolean
}

export interface RecurringTokenConfiguration {
    recurringType?: RecurringTokenPrivilege;
    chargeWaitPeriod?: string;
    cardChargeCvvConfirmation?: {
        enabled?: boolean;
        threshold?: Array<AmountWithCurrency>;
    }
}

export interface ConfigurationItem {
    cardBrandPercentFees: CardBrandPercentFeesItem
    cardConfiguration: CardConfigurationItem
    qrScanConfiguration: QRScanConfigurationItem
    convenienceConfiguration: ConvenienceConfigurationItem
    installmentsConfiguration: InstallmentsConfigurationItem
    flatFees: Array<AmountWithCurrency>
    maximumChargeAmounts: Array<AmountWithCurrency>
    minTransferPayout?: AmountWithCurrency
    percentFee: number
    logoUrl?: string
    securityConfiguration?: SecurityConfiguration
    userTransactionsConfiguration?: UserTransactionsConfiguration
    recurringTokenConfiguration?: RecurringTokenConfiguration
}

export interface ConfigurationParams {
    logoUrl?: string
    cardConfiguration?: Partial<CardConfigurationItem>
    qrScanConfiguration?: Partial<QRScanConfigurationItem>
    convenienceConfiguration?: Partial<ConvenienceConfigurationItem>
    installmentsConfiguration?: Partial<InstallmentsConfigurationItem>
}

export type ConfigurationCreateParams = ConfigurationParams;
export type ConfigurationUpdateParams = ConfigurationParams;
