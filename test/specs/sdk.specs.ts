import "../utils"
import { test, AssertContext } from "ava"
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

test("SDK", (t: AssertContext) => {
    const sdk = new SDK({ endpoint : "/" })

    expect(sdk).to.have.property("api").that.is.an.instanceOf(RestAPI)

    expect(sdk).to.have.property("bankAccounts").that.is.an.instanceOf(BankAccounts).and.has.property("api", sdk.api)
    expect(sdk).to.have.property("charges").that.is.an.instanceOf(Charges).and.has.property("api", sdk.api)
    expect(sdk).to.have.property("checkoutInfo").that.is.an.instanceOf(CheckoutInfo).and.has.property("api", sdk.api)
    expect(sdk).to.have.property("merchants").that.is.an.instanceOf(Merchants).and.has.property("api", sdk.api)
    expect(sdk).to.have.property("refunds").that.is.an.instanceOf(Refunds).and.has.property("api", sdk.api)
    expect(sdk).to.have.property("stores").that.is.an.instanceOf(Stores).and.has.property("api", sdk.api)
    expect(sdk).to.have.property("subscriptions").that.is.an.instanceOf(Subscriptions).and.has.property("api", sdk.api)
    expect(sdk).to.have.property("transactionTokens").that.is.an.instanceOf(TransactionTokens).and.has.property("api", sdk.api)
    expect(sdk).to.have.property("transfers").that.is.an.instanceOf(Transfers).and.has.property("api", sdk.api)
    expect(sdk).to.have.property("verification").that.is.an.instanceOf(Verification).and.has.property("api", sdk.api)
    expect(sdk).to.have.property("webHooks").that.is.an.instanceOf(WebHooks).and.has.property("api", sdk.api)
})
