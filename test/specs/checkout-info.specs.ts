import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { CheckoutInfo } from "../../src/resources/CheckoutInfo"
import { Scope } from "nock"

describe("Checkout Info", () => {
    let api: RestAPI
    let info: CheckoutInfo
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        info = new CheckoutInfo(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /checkout_info", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get("/checkout_info")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return info.get().should.eventually.eql(okResponse)
        })
    })

})
