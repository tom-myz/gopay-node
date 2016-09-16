import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { Subscriptions } from "../../src/resources/Subscriptions"
import { Scope } from "nock"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

describe("Charges", () => {
    let api: RestAPI
    let subscriptions: Subscriptions
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        subscriptions = new Subscriptions(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /stores/:storeId/subscriptions", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/\/stores\/[a-f-0-9\-]+\/subscriptions$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return subscriptions.list("1").should.eventually.eql(okResponse)
        })
    })

    context("route POST /subscriptions", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post("/subscriptions")
                .once()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data: any = null

            return subscriptions.create(data).should.eventually.eql(okResponse)
        })

        xit("should return validation error if data is invalid", () => {
            const asserts = [
                {}
            ]

            return Promise.all(asserts.map((a: any) => {
                return subscriptions.create(a).should.be.rejected
                    .then((e: ErrorResponse) => expect(e.code).to.equal(VALIDATION_ERROR))
            }))
        })
    })

    context("route GET /stores/:storeId/subscriptions/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/\/stores\/[a-f-0-9\-]+\/subscriptions\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return subscriptions.get("1", "1").should.eventually.eql(okResponse)
        })
    })

})
