import "../utils"
import { expect } from "chai"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI } from "../../src/api/RestAPI"
import { Merchants } from "../../src/resources/Merchants"

describe("Merchants", () => {
    let api: RestAPI
    let merchants: Merchants
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        merchants = new Merchants(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /me", () => {
        it("should return correct response", () => {
            const okResponse = { action : "me" }
            const okScope = scope
                .get("/me")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return merchants.me().should.eventually.eql(okResponse)
        })
    })

})
