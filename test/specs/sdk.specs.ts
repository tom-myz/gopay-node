import "../utils"
import { expect } from "chai"
import SDK from "../../src/index.ts"
import { RestAPI } from "../../src/api/RestAPI"
import { Authorization } from "../../src/resources/Authorization"
import { Merchant } from "../../src/resources/merchants/Merchant"
import { Merchants } from "../../src/resources/merchants/Merchants"
import { Store } from "../../src/resources/stores/Store"
import { Stores } from "../../src/resources/stores/Stores"
import { TransactionToken } from "../../src/resources/charges/TransactionToken"
import { Charge } from "../../src/resources/charges/Charge"
import { Charges } from "../../src/resources/charges/Charges"
import { Transfer } from "../../src/resources/transfers/Transfer"
import { Transfers } from "../../src/resources/transfers/Transfers"
import { Payouts } from "../../src/resources/payouts/Payouts"
import { BankAccount } from "../../src/resources/bankAccounts/BankAccount"
import { BankAccounts } from "../../src/resources/bankAccounts/BankAccounts"
import { ApplicationToken } from "../../src/resources/stores/ApplicationToken"
import { StoreConfiguration } from "../../src/resources/stores/StoreConfiguration"

describe("SDK", () => {
    it("should create instance with all resource objects", () => {
        const sdk = new SDK({ endpoint : "/" })

        expect(sdk).to.have.property("api").that.is.an.instanceOf(RestAPI)
        expect(sdk).to.have.property("authorization").that.is.an.instanceOf(Authorization).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("merchant").that.is.an.instanceOf(Merchant).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("merchants").that.is.an.instanceOf(Merchants).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("token").that.is.an.instanceOf(TransactionToken).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("charge").that.is.an.instanceOf(Charge).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("charges").that.is.an.instanceOf(Charges).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("transfer").that.is.an.instanceOf(Transfer).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("transfers").that.is.an.instanceOf(Transfers).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("payouts").that.is.an.instanceOf(Payouts).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("bankAccount").that.is.an.instanceOf(BankAccount).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("bankAccounts").that.is.an.instanceOf(BankAccounts).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("stores").that.is.an.instanceOf(Stores).and.has.property("api", sdk.api)
        expect(sdk).to.have.property("store").that.is.an.instanceOf(Store).and.has.property("api", sdk.api)
        expect(sdk.store).to.have.property("configuration").that.is.an.instanceOf(StoreConfiguration).and.has.property("api", sdk.api)
        expect(sdk.store).to.have.property("applicationToken").that.is.an.instanceOf(ApplicationToken).and.has.property("api", sdk.api)
    })
})
