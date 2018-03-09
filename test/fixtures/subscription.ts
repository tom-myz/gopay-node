import uuid = require("uuid");
import { SubscriptionItem, SubscriptionPeriod, SubscriptionStatus } from "../../src/resources/Subscriptions";
import { ProcessingMode } from "../../src/resources/common/enums";

export function generateFixture(): SubscriptionItem {
    return {
        id                 : uuid(),
        merchantId         : uuid(),
        storeId            : uuid(),
        transactionTokenId : uuid(),
        amount             : 1000,
        currency           : "JPY",
        amountFormatted    : 1000,
        period             : SubscriptionPeriod.MONTHLY,
        status             : SubscriptionStatus.CURRENT,
        metadata           : {},
        mode               : ProcessingMode.TEST,
        createdOn          : new Date().toISOString()
    }
}
