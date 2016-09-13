import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src1/api/RestAPI"
import { Refunds } from "../../src1/resources/Refunds"
import { Scope } from "nock"
import { VALIDATION_ERROR } from "../../src1/errors/ErrorsConstants"
import { SDKError } from "../../src1/errors/SDKError"

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

    context("route GET /merchants/:merchantId/stores/:storeId/charges/:chargeId/refunds", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/charges\/[a-z0-9\-]+\/refunds$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                refunds.list("1", "1").should.eventually.eql(okResponse),
                refunds.list("1", "1", null, null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route POST /merchants/:merchantId/stores/:storeId/charges/:chargeId/refunds", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/charges\/[a-z0-9\-]+\/refunds$/i)
                .once()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = {
                amount : 100.00,
                currency : "USD"
            }

            return refunds.create("1", "1", data).should.eventually.eql(okResponse)
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                { amount: "", currency: "" },
                { amount: "a", currency: "a" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return refunds.create("1", "1", a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route GET /merchants/:merchantId/stores/:storeId/charges/:chargeId/refunds/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/charges\/[a-f0-9\-]+\/refunds\/[a-z0-9]+$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                refunds.get("1", "1", "1").should.eventually.eql(okResponse),
                refunds.get("1", "1", "1", null, "1").should.eventually.eql(okResponse)
            ])
        })
    })

})
