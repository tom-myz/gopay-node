import { WithCreatedOn, AmountWithCurrency, InvoiceChargeFee } from "./types"
import { CardBrandPercentFeesItem, InstallmentsConfiguration, UserTransactionsConfiguration } from "./Configuration"
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
}

export interface PlatformPaymentDefaults {
    cardsEnabled: boolean;
    qrScanEnabled: boolean;
    prepaidEnabled: boolean;
    debitEnabled: boolean;
    convenienceEnabled: boolean;
    installmentsEnabled: boolean;
}

export interface PlatformItem extends WithCreatedOn {
    id: string;
    domain: string;
    name: string;
    invoiceChargeFee: Array<InvoiceChargeFee>;
}

export interface PlatformConfiguration {
    adminEmailAddresses: Array<string>;
    notifyUserTransactions: boolean;
    defaultLanguage: string;
    supportedLanguages: Array<string>;
    country: string;
    currency: string;
    logoUri: string;
    userDefaults: PlatformUserDefaults;
    paymentDefaults: PlatformPaymentDefaults;
}
