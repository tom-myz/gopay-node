import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Balance } from "../../src/resources/Balance"
import { Scope } from "nock"

describe("Balance", () => {
    let api: RestAPI
    let balance: Balance
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        balance = new Balance(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /balance", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get("/balance")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return balance.get().should.eventually.eql(okResponse)
        })
    })

    context("route GET /stores/:storeId/balance", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/\/stores\/[a-f0-9\-]+\/balance$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return balance.get("1").should.eventually.eql(okResponse)
        })
    })

})
