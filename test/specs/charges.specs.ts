import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Charges } from "../../src/resources/Charges"
import { Scope } from "nock"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { SDKError } from "../../src/errors/SDKError"

describe("Charges", () => {
    let api: RestAPI
    let charges: Charges
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        charges = new Charges(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /merchants/:merchantId/stores/:storeId/charges", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/charges$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                charges.list("1").should.eventually.eql(okResponse),
                charges.list("1", null, null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route POST /charges", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post("/charges")
                .once()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = {
                token : "token",
                amount : 100.00,
                currency : "USD"
            }

            return charges.create(data).should.eventually.eql(okResponse)
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                { token: "", amount: "", currency: "" },
                { token: "token", amount: "", currency: "" },
                { token: "token", amount: "a", currency: "a" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return charges.create(a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route GET /merchants/:merchantId/stores/:storeId/charges/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/(merchants\/[a-z0-9\-]+\/)?stores\/[a-z0-9\-]+\/charges\/[a-f0-9\-]+$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                charges.get("1", "1").should.eventually.eql(okResponse),
                charges.get("1", "1", null, "1").should.eventually.eql(okResponse)
            ])
        })
    })

})
