import uuid from "uuid";
import {
    InstallmentPlan,
    SubscriptionItem,
    SubscriptionPeriod,
    SubscriptionStatus
} from "../../src/resources/Subscriptions";
import { ProcessingMode } from "../../src/resources/common/enums";

export function generateFixture(): SubscriptionItem {
    return {
        id: uuid(),
        storeId: uuid(),
        transactionTokenId: uuid(),
        amount: 1000,
        currency: "JPY",
        amountFormatted: 1000,
        period: SubscriptionPeriod.MONTHLY,
        status: SubscriptionStatus.CURRENT,
        metadata: {},
        mode: ProcessingMode.TEST,
        createdOn: new Date().toISOString(),
        amountLeft: 1000,
        amountLeftFormatted: 1000,
        initialAmount: 1000,
        initialAmountFormatted: 1000,
        subsequentCyclesStart: "",
        paymentsLeft: 4,
        scheduleSettings: {
            startDateReference: new Date().toISOString(),
            startOn: new Date().toISOString(),
            zoneId: "Asia/Tokyo",
            preserveEndOfMonth: true
        },
        installmentPlan: InstallmentPlan.FIXED_CYCLES,
        nextPayment: {
            id: uuid(),
            subscriptionId: uuid(),
            dueDate: new Date().toISOString(),
            zoneId: "Asia/Tokyo",
            amount: 1,
            currency: "JPY",
            isPaid: false,
            isLastPayment: false,
            createdOn: new Date().toISOString()
        }
    }
};
