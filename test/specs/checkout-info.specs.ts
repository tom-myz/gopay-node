import "../utils"
import { test, TestContext } from "ava"
import nock from "nock"
import { Scope } from "nock"
import { RestAPI } from "../../src/api/RestAPI"
import { CheckoutInfo } from "../../src/resources/CheckoutInfo"

let api: RestAPI
let info: CheckoutInfo
let scope: Scope
const testEndpoint = "http://localhost:80"

test.beforeEach(() => {
    api = new RestAPI({endpoint: testEndpoint })
    info = new CheckoutInfo(api)
    scope = nock(testEndpoint)
})

test("route GET /checkout_info # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "get" }
    const okScope = scope
        .get(/\/checkout_info/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await info.get({ origin : "http://test.com" })

    t.deepEqual(r, okResponse)
})
