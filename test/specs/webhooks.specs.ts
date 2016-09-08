import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { WebHooks } from "../../src/resources/WebHooks"
import { Scope } from "nock"
import { SDKError } from "../../src/errors/SDKError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

describe("Webhooks", () => {
    let api: RestAPI
    let scope: Scope
    let webhooks: WebHooks
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint, camel : true })
        scope = nock(testEndpoint)
        webhooks = new WebHooks(api)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /merchants/:merchantId/stores/:storeId/webhooks", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/webhooks$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                webhooks.list("1").should.eventually.eql(okResponse),
                webhooks.list("1", null, null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route POST /merchants/:merchantId/stores/:storeId/webhooks", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/webhooks+$/i)
                .twice()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = { triggers : ["success"], url : "http://test.com" }

            return Promise.all([
                webhooks.create("1", data).should.eventually.eql(okResponse),
                webhooks.create("1", data, null, "1").should.eventually.eql(okResponse)
            ])
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                { triggers: "", url : "" },
                { triggers: "aa", url : "aa" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return webhooks.create("1", a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route PATCH /merchants/:merchantId/stores/:storeId/webhooks/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/webhooks\/[a-f0-9\-]+$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })
            const data = { triggers : ["success"], url : "http://test.com" }

            return Promise.all([
                webhooks.update("1", "1", data).should.eventually.eql(okResponse),
                webhooks.update("1", "1", data, null, "1").should.eventually.eql(okResponse)
            ])
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                { triggers: "aa", url : "aa" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return webhooks.update("1", "1", a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route DELETE /merchants/:merchantId/stores/:storeId/webhooks/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "delete" }
            const okScope = scope
                .delete(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/webhooks\/[a-z0-9\-]+$/i)
                .twice()
                .reply(204, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                webhooks.delete("1", "1").should.eventually.eql(okResponse),
                webhooks.delete("1", "1", null, "1").should.eventually.eql(okResponse)
            ])
        })
    })

})
