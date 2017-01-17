import "../utils"
import { expect } from "chai"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { BankAccounts } from "../../src/resources/BankAccounts"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

describe("Bank Accounts", () => {
    let api: RestAPI
    let accounts: BankAccounts
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        accounts = new BankAccounts(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /bank_accounts", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get("/bank_accounts")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return accounts.list().should.eventually.eql(okResponse)
        })
    })

    context("route POST /bank_accounts", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post("/bank_accounts")
                .once()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = {
                accountNumber : "test",
                country       : "test",
                currency      : "test",
                holderName    : "test",
                bankName      : "test"
            }

            return accounts.create(data).should.eventually.eql(okResponse)
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                {}
            ]

            return Promise.all(asserts.map((a: any) => {
                return accounts.create(a).should.be.rejected
                    .then((e: ErrorResponse) => expect(e.code).to.equal(VALIDATION_ERROR))
            }))
        })
    })

    context("route GET /bank_accounts/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/\/bank_accounts\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return accounts.get("1").should.eventually.eql(okResponse)
        })
    })

    context("route GET /bank_accounts/primary", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get("/bank_accounts/primary")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return accounts.getPrimary().should.eventually.eql(okResponse)
        })
    })

    context("route PATCH /bank_accounts/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch(/\/bank_accounts\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })
            const data: any = null

            return accounts.update("1", data).should.eventually.eql(okResponse)
        })
    })

    context("route DELETE /bank_accounts/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .delete(/\/bank_accounts\/[a-f-0-9\-]+$/i)
                .once()
                .reply(204, okResponse, { "Content-Type" : "application/json" })

            return accounts.delete("1").should.eventually.eql(okResponse)
        })
    })

})
