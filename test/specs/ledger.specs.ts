import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Ledger } from "../../src/resources/Ledger"
import { Scope } from "nock"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { SDKError } from "../../src/errors/SDKError"

describe("Ledger", () => {
    let api: RestAPI
    let ledger: Ledger
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        ledger = new Ledger(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /ledger", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get("/ledger")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return ledger.list().should.eventually.eql(okResponse)
        })
    })

    context("route PATCH /ledger/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch(/ledger\/[a-f0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })
            const data = { status : "done" }

            return ledger.update("1", data).should.eventually.eql(okResponse)
        })
    })

})
