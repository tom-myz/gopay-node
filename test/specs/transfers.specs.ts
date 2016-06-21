import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Transfers } from "../../src/resources/Transfers"
import { Scope } from "~nock/index"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { SDKError } from "../../src/errors/SDKError"

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

    context("route GET /merchants/:merchantId/transfers", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/(merchants\/[a-f0-9\-]+\/)?transfers$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                transfers.list().should.eventually.eql(okResponse),
                transfers.list(null, null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route POST /merchants/:merchantId/transfers", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post(/(merchants\/[a-f0-9\-]+\/)?transfers$/i)
                .twice()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = { processTo : "2020-01-01T00:00:00Z" }

            return Promise.all([
                transfers.create(data).should.eventually.eql(okResponse),
                transfers.create(data, null, "1").should.eventually.eql(okResponse),
            ])
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                //{ processTo : "" },
                { processFrom : "a", processTo : "a" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return transfers.create(a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route GET /merchants/:merchantId/transfers/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/(merchants\/[a-f0-9\-]+\/)?transfers\/[a-f-0-9\-]+$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                transfers.get("1").should.eventually.eql(okResponse),
                transfers.get("1", null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route PATCH /merchants/:merchantId/transfers/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch(/(merchants\/[a-f0-9\-]+\/)?transfers\/[a-f-0-9\-]+$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })
            const data = { status : "test" }

            return Promise.all([
                transfers.update("1", data).should.eventually.eql(okResponse),
                transfers.update("1", data, null, "1").should.eventually.eql(okResponse)
            ])
        })
    })

})
