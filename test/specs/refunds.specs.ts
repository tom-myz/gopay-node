import "../utils"
import { expect } from "chai"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { Refunds } from "../../src/resources/Refunds"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

describe("Refunds", () => {
    let api: RestAPI
    let refunds: Refunds
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        refunds = new Refunds(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /stores/:storeId/charges/:chargeId/refunds", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/\/stores\/[a-f0-9\-]+\/charges\/[a-f0-9\-]+\/refunds$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return refunds.list("1", "1").should.eventually.eql(okResponse)
        })
    })

    context("route POST /stores/:storeId/charges/:chargeId/refunds", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post(/\/stores\/[a-f0-9\-]+\/charges\/[a-f0-9\-]+\/refunds$/i)
                .once()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = {
                token    : "test",
                amount   : 1,
                currency : "usd"
            }

            return refunds.create("1", "1", data).should.eventually.eql(okResponse)
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                {}
            ]

            return Promise.all(asserts.map((a: any) => {
                return refunds.create("1", "1", a).should.be.rejected
                    .then((e: ErrorResponse) => expect(e.code).to.equal(VALIDATION_ERROR))
            }))
        })
    })

    context("route GET /stores/:storeId/charges/:chargeId/refunds/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/\/stores\/[a-f0-9\-]+\/charges\/[a-f0-9\-]+\/refunds\/[a-z0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return refunds.get("1", "1", "1").should.eventually.eql(okResponse)
        })
    })

})
