import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Ledger } from "../../src/resources/Ledger"
import { Scope } from "~nock/index"
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

    context("route GET /merchants/:merchantId/stores/:storeId/ledgers", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/(merchants\/[a-z0-9\-]+\/)?(stores\/[a-z0-9\-]+\/)?ledgers/i)
                .times(4)
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                ledger.list().should.eventually.eql(okResponse),
                ledger.list(null, null, "1").should.eventually.eql(okResponse),
                ledger.list(null, null, null, "1").should.eventually.eql(okResponse),
                ledger.list(null, null, "1", "1").should.eventually.eql(okResponse)
            ])
        })
    })

    context("route PATCH /merchants/:merchantId/stores/:storeId/ledger/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch(/(merchants\/[a-z0-9\-]+\/)?(stores\/[a-z0-9\-]+\/)?ledgers\/[a-f0-9\-]+$/i)
                .times(4)
                .reply(200, okResponse, { "Content-Type" : "application/json" })
            const data = { status : "done" }

            return Promise.all([
                ledger.update("1", data).should.eventually.eql(okResponse),
                ledger.update("1", data, null, "1").should.eventually.eql(okResponse),
                ledger.update("1", data, null, null, "1").should.eventually.eql(okResponse),
                ledger.update("1", data, null, "1", "1").should.eventually.eql(okResponse)
            ])

        })
    })

})
