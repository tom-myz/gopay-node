import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Stores } from "../../src/resources/Stores"
import { Scope } from "~nock/index"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { SDKError } from "../../src/errors/SDKError"

describe("Stores", () => {
    let api: RestAPI
    let stores: Stores
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        stores = new Stores(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /merchants/:merchantId/stores", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/(merchants\/[a-f0-9\-]+\/)?stores$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                stores.list().should.eventually.eql(okResponse),
                stores.list(null, null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route POST /merchants/:merchantId/stores", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post(/(merchants\/[a-f0-9\-]+\/)?stores$/i)
                .twice()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = {
                name : "test"
            }

            return Promise.all([
                stores.create(data).should.eventually.eql(okResponse),
                stores.create(data, null, "1").should.eventually.eql(okResponse),
            ])
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                { name: "" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return stores.create(a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route GET /merchants/:merchantId/stores/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/(merchants\/[a-f0-9\-]+\/)?stores\/[a-f-0-9\-]+$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                stores.get("1").should.eventually.eql(okResponse),
                stores.get("1", null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route PATCH /merchants/:merchantId/stores/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch(/(merchants\/[a-f0-9\-]+\/)?stores\/[a-f-0-9\-]+$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })
            const data = { name : "test" }

            return Promise.all([
                stores.update("1", data).should.eventually.eql(okResponse),
                stores.update("1", data, null, "1").should.eventually.eql(okResponse)
            ])
        })
    })

    context("route DELETE /merchants/:merchantId/stores/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .delete(/(merchants\/[a-f0-9\-]+\/)?stores\/[a-f-0-9\-]+$/i)
                .twice()
                .reply(204, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                stores.delete("1").should.eventually.eql(okResponse),
                stores.delete("1", null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

})
