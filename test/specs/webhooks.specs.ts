import "../utils"
import { expect } from "chai"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { WebHooks } from "../../src/resources/WebHooks"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

describe("WebHooks", () => {
    let api: RestAPI
    let webHooks: WebHooks
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        webHooks = new WebHooks(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /stores/:storeId/webhooks", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/\/stores\/[a-f-0-9\-]+\/webhooks$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return webHooks.list("1").should.eventually.eql(okResponse)
        })
    })

    context("route POST /stores/:storeId/webhooks", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post(/\/stores\/[a-f-0-9\-]+\/webhooks$/i)
                .once()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = {
                triggers: ["test"],
                url: "test"
            }

            return webHooks.create("1", data).should.eventually.eql(okResponse)
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                {}
            ]

            return Promise.all(asserts.map((a: any) => {
                return webHooks.create("1", a).should.be.rejected
                    .then((e: ErrorResponse) => expect(e.code).to.equal(VALIDATION_ERROR))
            }))
        })
    })

    context("route GET /stores/:storeId/webhooks/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/\/stores\/[a-f-0-9\-]+\/webhooks\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return webHooks.get("1", "1").should.eventually.eql(okResponse)
        })
    })

    context("route PATCH /stores/:storeId/webhooks/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch(/\/stores\/[a-f-0-9\-]+\/webhooks\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })
            const data = {
                triggers: ["test"],
                url: "test"
            }

            return webHooks.update("1", "1", data).should.eventually.eql(okResponse)
        })
    })

    context("route DELETE /stores/:storeId/webhooks/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .delete(/\/stores\/[a-f-0-9\-]+\/webhooks\/[a-f-0-9\-]+$/i)
                .once()
                .reply(204, okResponse, { "Content-Type" : "application/json" })

            return webHooks.delete("1", "1").should.eventually.eql(okResponse)
        })
    })

})
