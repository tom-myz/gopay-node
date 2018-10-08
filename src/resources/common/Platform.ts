import { WithCreatedOn, AmountWithCurrency, InvoiceChargeFee } from "./types"
import {
    CardBrandPercentFeesItem,
    InstallmentsConfiguration,
    SubscriptionsConfiguration,
    UserTransactionsConfiguration
} from "./Configuration"
import { TransferScheduleItem } from "./TransferSchedule"

export interface PlatformUserDefaults {
    percentFee: number;
    transferSchedule: TransferScheduleItem;
    flatFees: Array<AmountWithCurrency>;
    waitPeriod: string;
    cardBrandPercentFees: Partial<CardBrandPercentFeesItem>;
    minTransferPayout: AmountWithCurrency;
    installmentsConfiguration: Partial<InstallmentsConfiguration>;
    userTransactionsConfiguration?: UserTransactionsConfiguration;
    subscriptionConfiguration: Partial<SubscriptionsConfiguration>;
}

export interface PlatformPaymentDefaults {
    cardsEnabled: boolean;
    qrScanEnabled: boolean;
    prepaidEnabled: boolean;
    debitEnabled: boolean;
    convenienceEnabled: boolean;
    paidyEnabled: boolean;
}

export interface PlatformItem extends WithCreatedOn {
    id: string;
    domain: string;
    name: string;
    ownerId?: string;
    invoiceChargeFee: Array<InvoiceChargeFee>;
}

export interface PlatformConfiguration {
    adminEmailAddresses?: Array<string>;
    country: string;
    currency: string;
    defaultLanguage: string;
    limitCardChargeByCardConfiguration?: {
        quantityOfCharges: number;
        durationWindow: string;
    }
    logoUri: string;
    maximumChargeAmounts: Array<AmountWithCurrency>;
    minimumChargeAmounts: Array<AmountWithCurrency>;
    notifyUserTransactions: boolean;
    paymentDefaults: PlatformPaymentDefaults;
    recurringCardChargeCvvConfirmationThreshold?: Array<AmountWithCurrency>;
    refundPercentLimit: number;
    supportedLanguages: Array<string>;
    timeZone: string;
    userDefaults: PlatformUserDefaults;
}
