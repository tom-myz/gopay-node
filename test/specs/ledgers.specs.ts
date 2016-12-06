import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { Ledgers } from "../../src/resources/Ledgers"
import { Scope } from "nock"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

describe("Ledgers", () => {
    let api: RestAPI
    let ledgers: Ledgers
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({ endpoint: testEndpoint })
        ledgers = new Ledgers(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /transfer/:transferId/ledgers", () => {
        it("should return correct response", () => {
            const okResponse = { action : "get" }
            const okScope = scope
                .get(/\/transfers\/[a-f-0-9\-]+\/ledgers$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return ledgers.list("1").should.eventually.eql(okResponse)
        })
    })

})
