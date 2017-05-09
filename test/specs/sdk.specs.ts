import "../utils"
import { test, TestContext } from "ava"
import { expect } from "chai"
import SDK from "../../src/index"
import { RestAPI } from "../../src/api/RestAPI"

import { BankAccounts } from "../../src/resources/BankAccounts"
import { Charges } from "../../src/resources/Charges"
import { CheckoutInfo } from "../../src/resources/CheckoutInfo"
import { Merchants } from "../../src/resources/Merchants"
import { Refunds } from "../../src/resources/Refunds"
import { Stores } from "../../src/resources/Stores"
import { Subscriptions } from "../../src/resources/Subscriptions"
import { TransactionTokens } from "../../src/resources/TransactionTokens"
import { Transfers } from "../../src/resources/Transfers"
import { Verification } from "../../src/resources/Verification"
import { WebHooks } from "../../src/resources/WebHooks"

test("SDK", (t: TestContext) => {
    const sdk = new SDK({ endpoint : "/" })

    t.truthy(sdk.api)
    t.true(sdk.api instanceof RestAPI)

    t.truthy(sdk.bankAccounts)
    t.true(sdk.bankAccounts instanceof BankAccounts)
    t.deepEqual(sdk.bankAccounts.api, sdk.api)

    t.truthy(sdk.charges)
    t.true(sdk.charges instanceof Charges)
    t.deepEqual(sdk.charges.api, sdk.api)

    t.truthy(sdk.checkoutInfo)
    t.true(sdk.checkoutInfo instanceof CheckoutInfo)
    t.deepEqual(sdk.checkoutInfo.api, sdk.api)

    t.truthy(sdk.merchants)
    t.true(sdk.merchants instanceof Merchants)
    t.deepEqual(sdk.merchants.api, sdk.api)

    t.truthy(sdk.refunds)
    t.true(sdk.refunds instanceof Refunds)
    t.deepEqual(sdk.refunds.api, sdk.api)

    t.truthy(sdk.stores)
    t.true(sdk.stores instanceof Stores)
    t.deepEqual(sdk.stores.api, sdk.api)

    t.truthy(sdk.subscriptions)
    t.true(sdk.subscriptions instanceof Subscriptions)
    t.deepEqual(sdk.subscriptions.api, sdk.api)

    t.truthy(sdk.transactionTokens)
    t.true(sdk.transactionTokens instanceof TransactionTokens)
    t.deepEqual(sdk.transactionTokens.api, sdk.api)

    t.truthy(sdk.transfers)
    t.true(sdk.transfers instanceof Transfers)
    t.deepEqual(sdk.transfers.api, sdk.api)

    t.truthy(sdk.verification)
    t.true(sdk.verification instanceof Verification)
    t.deepEqual(sdk.verification.api, sdk.api)

    t.truthy(sdk.webHooks)
    t.true(sdk.webHooks instanceof WebHooks)
    t.deepEqual(sdk.webHooks.api, sdk.api)
})
