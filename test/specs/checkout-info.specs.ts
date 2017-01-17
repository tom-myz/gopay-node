import "../utils"
import { expect } from "chai"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI } from "../../src/api/RestAPI"
import { CheckoutInfo } from "../../src/resources/CheckoutInfo"

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
            const okResponse = { action : "get" }
            const okScope = scope
                .get(/\/checkout_info/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return info.get({ origin : "http://test.com" }).should.eventually.eql(okResponse)
        })
    })

})
