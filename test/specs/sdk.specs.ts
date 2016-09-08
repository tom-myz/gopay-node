import "../utils"
import { expect } from "chai"
import SDK from "../../src/index"
import { RestAPI } from "../../src/api/RestAPI"
import { Authorization } from "../../src/resources/Authorization"
import { Merchants } from "../../src/resources/Merchants"
import { Stores } from "../../src/resources/Stores"
import { TransactionTokens } from "../../src/resources/TransactionTokens"
import { Charges } from "../../src/resources/Charges"
import { Transfers } from "../../src/resources/Transfers"
import { Ledger } from "../../src/resources/Ledger"
import { BankAccounts } from "../../src/resources/BankAccounts"
import { ApplicationTokens } from "../../src/resources/ApplicationTokens"
import { WebHooks } from "../../src/resources/WebHooks"

describe("SDK", () => {
    it("should create instance with all resource objects", () => {
        const sdk = new SDK({ endpoint : "/" })

        expect(sdk).to.have.property("api").that.is.an.instanceOf(RestAPI)
        expect(sdk).to.have.property("authorization").that.is.an.instanceOf(Authorization).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("merchants").that.is.an.instanceOf(Merchants).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("charges").that.is.an.instanceOf(Charges).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("transfers").that.is.an.instanceOf(Transfers).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("ledger").that.is.an.instanceOf(Ledger).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("bankAccounts").that.is.an.instanceOf(BankAccounts).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("stores").that.is.an.instanceOf(Stores).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("applicationTokens").that.is.an.instanceOf(ApplicationTokens).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("transactionTokens").that.is.an.instanceOf(TransactionTokens).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("webHooks").that.is.an.instanceOf(WebHooks).and.has.property("api", sdk.api)
    })
})
