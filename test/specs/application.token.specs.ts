import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { ApplicationTokens } from "../../src/resources/ApplicationTokens"
import { Scope } from "~nock/index"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

describe("Application Tokens", () => {
    let api: RestAPI
    let scope: Scope
    let applicationTokens: ApplicationTokens
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint, camel : true })
        scope = nock(testEndpoint)
        applicationTokens = new ApplicationTokens(api)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /merchants/:merchantId/stores/:storeId/app_tokens", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/app_tokens$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                applicationTokens.list("1").should.eventually.eql(okResponse),
                applicationTokens.list("1", null, null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route POST /merchants/:merchantId/stores/:storeId/app_tokens", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/app_tokens$/i)
                .twice()
                .reply(201, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                applicationTokens.create("1").should.eventually.eql(okResponse),
                applicationTokens.create("1", null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route DELETE /merchants/:merchantId/stores/:storeId/app_tokens/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "delete" }
            const okScope = scope
                .delete(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/app_tokens\/[a-z0-9\-]+$/i)
                .twice()
                .reply(204, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                applicationTokens.delete("1", "1").should.eventually.eql(okResponse),
                applicationTokens.delete("1", "1", null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

})
