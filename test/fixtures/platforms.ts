import uuid from "uuid";
import { PlatformConfigurationItem } from "../../src/resources/Platforms";
import { CardBrand } from "../../src/resources/common/enums";
import { PaymentType } from "../../src/resources/TransactionTokens";
import { generateFixture as generateTransferSchedule } from "./common/transfer-schedule";
import {generateFixtureInstallmentConfiguration} from "./common/configuration";

export function generateFixture(): PlatformConfigurationItem {
    return {
        id                    : uuid(),
        domain                : "fake.com",
        name                  : "Platform",
        configuration         : {
            adminEmailAddresses    : ["test@fake.com"],
            notifyUserTransactions : true,
            defaultLanguage        : "JA_JP",
            supportedLanguages     : ["JA_JP"],
            country                : "JP",
            currency               : "JPY",
            logoUri                : "http://fake.com/logo.jpg",
            userDefaults           :{
                percentFee           : 3.5,
                transferSchedule     : generateTransferSchedule(),
                flatFees             : [
                    { amount : 30, currency: "JPY" }
                ],
                waitPeriod           : "FIXME",
                cardBrandPercentFees : {},
                minTransferPayout    : {
                    amount   : 1000,
                    currency : "JPY"
                },
                installmentsConfiguration : generateFixtureInstallmentConfiguration()
            },
            paymentDefaults: {
                cardsEnabled: true,
                qrScanEnabled: true,
                prepaidEnabled: true,
                debitEnabled: true,
                convenienceEnabled: true,
                installmentsEnabled: true
            },
        },
        supportedPaymentTypes : [PaymentType.CARD],
        supportedCardBrands   : [CardBrand.VISA],
        createdOn             : new Date().toISOString(),
        invoiceChargeFee: [
            {
                chargeVolume     : 0,
                chargeInvoiceFee : 100
            }
        ]
    }
}
