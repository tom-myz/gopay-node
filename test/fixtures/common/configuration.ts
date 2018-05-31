import {
    CardConfigurationItem,
    PaymentTypeConfiguration,
    ConfigurationItem, InstallmentsConfigurationItem
} from "../../../src/resources/common/Configuration";
import { CardBrand } from "../../../src/resources/common/enums";

export function generateFixturePaymentType(): PaymentTypeConfiguration {
    return {
        enabled : true
    };
}

export function generateFixtureCardConfiguration(): CardConfigurationItem {
    return {
        ...generateFixturePaymentType(),
        debitEnabled         : true,
        prepaidEnabled       : true,
        forbiddenCardBrands  : [CardBrand.AMEX],
        foreignCardsAllowed  : true,
        failOnNewEmail       : false,
        allowedCountriesByIp : ["JP"],
        allowEmptyCvv        : false,
        cardLimit            : {
            amount   : 1000,
            currency : "JPY"
        }
    }
}

export function generateFixtureInstallmentConfiguration(): InstallmentsConfigurationItem {
    return {
        ...generateFixturePaymentType(),
        minChargeAmount      : 1000,
        maxPayoutPeriod      : "P7D",
        failedCyclesToCancel : 3
    };
}

export function generateFixture(): ConfigurationItem {
    return {
        cardBrandPercentFees     : {},
        cardConfiguration        : generateFixtureCardConfiguration(),
        qrScanConfiguration      : generateFixturePaymentType(),
        convenienceConfiguration : generateFixturePaymentType(),
        flatFees                 : [
            { amount : 30, currency : "JPY" }
        ],
        percentFee: 3.5,
        logoUrl: "http://fake.com/logo.jpg",
        securityConfiguration: {
            inspectSuspiciousLoginAfter    : "TODO",
            limitChargeByCardConfiguration : {
                quantityOfCharges : 1000,
                durationWindow    : "P1M"
            },
            refundPercentLimit : 5
        },
        installmentsConfiguration : generateFixtureInstallmentConfiguration(),
        maximumChargeAmounts      : [],

    }
}
