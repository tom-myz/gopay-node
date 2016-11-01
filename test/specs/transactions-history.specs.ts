import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { TransactionsHistory } from "../../src/resources/TransactionsHistory"
import { Scope } from "nock"

describe("Transaction History", () => {
    let api: RestAPI
    let history: TransactionsHistory
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        history = new TransactionsHistory(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /transaction_history", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get("/transaction_history")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return history.list().should.eventually.eql(okResponse)
        })
    })

    context("route GET /stores/:storeId/transaction_history", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/\/stores\/[a-f0-9\-]+\/transaction_history$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return history.list("1").should.eventually.eql(okResponse)
        })
    })

})
