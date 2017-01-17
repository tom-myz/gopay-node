import "../utils"
import { expect } from "chai"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI } from "../../src/api/RestAPI"
import { Transfers } from "../../src/resources/Transfers"

describe("Transfers", () => {
    let api: RestAPI
    let transfers: Transfers
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        transfers = new Transfers(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /transfers", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get("/transfers")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return transfers.list().should.eventually.eql(okResponse)
        })
    })

    context("route GET /transfers/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "get" }
            const okScope = scope
                .get(/\/transfers\/[a-f0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return transfers.get("1").should.eventually.eql(okResponse)
        })
    })

})
