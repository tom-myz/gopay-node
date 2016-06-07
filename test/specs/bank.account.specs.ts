import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { BankAccount } from "../../src/resources/bankAccounts/BankAccount"
import { BankAccounts } from "../../src/resources/bankAccounts/BankAccounts"
import { Scope } from "~nock/index"
import { CommonError } from "../../src/errors/CommonError"
import { ValidationError } from "../../src/errors/ValidationError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { ResponseError } from "../../src/errors/ResponseError"
import { RequestError } from "../../src/errors/RequestError"

describe("Bank Account", () => {

    let api:RestAPI
    let account:BankAccount
    let accounts:BankAccounts
    let scope:Scope

    beforeEach(() => {
        api = new RestAPI({ endpoint : "/", token : "token" })
        account = new BankAccount(api)
        accounts = new BankAccounts(api)
        scope = nock("http://localhost:80")
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it("should not allow to call forbidden actions", () => {
        return account.delete().should.be.rejected.then((e: CommonError) => {
            expect(e).to.be.an.instanceOf(RequestError)
            expect(e.code).to.equal("ACTION_NOT_PERMITTED")
        })
    })

    it("should call the api to create bank account", () => {
        const okResponse = { status : "created" }
        const okScope = scope
            .post(/(merchants\/[a-f0-9\-]+\/)?bank_accounts/i)
            .twice()
            .reply(201, okResponse, { "Content-Type" : "application/json" })
        const data = {
            holderName : "Joe Doe",
            bankName : "SMBC",
            currency : "USD",
            accountNumber: "1234567890"
        }

        return Promise.all([
            account.create({ data }).should.eventually.eql(okResponse),
            account.create({ merchantId: "1", data }).should.eventually.eql(okResponse)
        ])
    })

    it("should not call api if request data is invalid", () => {
        const asserts: Array<any> = [
            [
                { holderName: "", bankName : "", currency : "", accountNumber: "" },
                [{ accountNumber : "REQUIRED_VALUE" }, { bankName : "REQUIRED_VALUE" }, { currency : "REQUIRED_VALUE" }, { holderName : "REQUIRED_VALUE" }]
            ],
            [
                { holderName: "foo", bankName : "foo", currency : "a", accountNumber: "1234567890" },
                [{ currency : "INVALID_FORMAT_LENGTH_MIN" }]
            ]
        ]

        return Promise.all(
            asserts.map((a) => {
                return account.create({ data : a[0] }).should.be.rejected.then((e: CommonError) => {
                    expect(e).to.be.an.instanceOf(ValidationError)
                    expect(e.code).to.equal(VALIDATION_ERROR)
                    expect(e.errors).to.eql(a[1])
                })
            })
        )
    })

    it("should call api for single bank account", () => {
        const okResponse = { status : "read" }
        const scopeScope = scope
            .get(/(merchants\/[a-f-0-9\-]+\/)?bank_accounts\/[a-f0-9\-]+$/i)
            .twice()
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return Promise.all([
            account.read({ id : "123" }).should.eventually.eql(okResponse),
            account.read({ merchantId: "1", id : "123" }).should.eventually.eql(okResponse)
        ])

    })

    it("should call api for list of bank accounts", () => {
        const okResponse = { status : "read" }
        const scopeScope = scope
            .get(/(merchants\/[a-f-0-9\-]+\/)?bank_accounts?$/i)
            .twice()
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return Promise.all([
            accounts.read().should.eventually.eql(okResponse),
            accounts.read({ merchantId: "1"}).should.eventually.eql(okResponse)
        ])
    })

})
