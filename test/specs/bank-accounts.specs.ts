import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { BankAccounts } from "../../src/resources/BankAccounts"
import { Scope } from "~nock/index"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { SDKError } from "../../src/errors/SDKError"

describe("Bank Accounts", () => {
    let api: RestAPI
    let accounts: BankAccounts
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({ endpoint : testEndpoint })
        accounts = new BankAccounts(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /merchants/:merchantId/bank_accounts", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/(merchants\/[a-f0-9\-]+\/)?bank_accounts$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                accounts.list().should.eventually.eql(okResponse),
                accounts.list(null, null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route POST /merchants/:merchantId/bank_accounts", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
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
                accounts.create(data).should.eventually.eql(okResponse),
                accounts.create(data, null, "1").should.eventually.eql(okResponse)
            ])
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                { holderName: "", bankName : "", currency : "", accountNumber: "" },
                { holderName: "foo", bankName : "foo", currency : "a", accountNumber: "1234567890" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return accounts.create(a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route GET /merchants/:merchantId/bank_accounts/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/(merchants\/[a-f-0-9\-]+\/)?bank_accounts\/[a-f0-9\-]+$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                accounts.get("1").should.eventually.eql(okResponse),
                accounts.get("1", null, "1").should.eventually.eql(okResponse)
            ])
        })
    })

    context("route PATCH /merchants/:merchantId/bank_accounts/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch(/(merchants\/[a-f0-9\-]+\/)?bank_accounts\/[a-f0-9]+/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })
            const data = { currency : "USD" }

            return Promise.all([
                accounts.update("1", data).should.eventually.eql(okResponse),
                accounts.update("1", data, null, "1").should.eventually.eql(okResponse)
            ])
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                { currency : "a" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return accounts.update("1", a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route DELETE /merchants/:merchantId/bank_accounts/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "delete" }
            const okScope = scope
                .delete(/(merchants\/[a-f0-9\-]+\/)?bank_accounts\/[a-f0-9]+/i)
                .twice()
                .reply(204, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                accounts.delete("1").should.eventually.eql(okResponse),
                accounts.delete("1", null, "1").should.eventually.eql(okResponse)
            ])
        })
    })

})
