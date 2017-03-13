import "../utils"
import { test, AssertContext } from "ava"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI } from "../../src/api/RestAPI"
import { CheckoutInfo } from "../../src/resources/CheckoutInfo"

let api: RestAPI
let info: CheckoutInfo
let scope: Scope
const testEndpoint = "http://localhost:80"

test.before(() => {
    api = new RestAPI({endpoint: testEndpoint })
    info = new CheckoutInfo(api)
    scope = nock(testEndpoint)
})

test.always.after(() => {
    nock.cleanAll()
})

test("route GET /checkout_info # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "get" }
    const okScope = scope
        .get(/\/checkout_info/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await t.notThrows(info.get({ origin : "http://test.com" }))

    t.deepEqual(r, okResponse)
})
