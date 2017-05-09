import "../utils"
import { test, TestContext } from "ava"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI } from "../../src/api/RestAPI"
import { Merchants } from "../../src/resources/Merchants"

let api: RestAPI
let merchants: Merchants
let scope: Scope
const testEndpoint = "http://localhost:80"

test.beforeEach(() => {
    api = new RestAPI({endpoint: testEndpoint })
    merchants = new Merchants(api)
    scope = nock(testEndpoint)
})

test("route GET /me # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "me" }
    const okScope = scope
        .get("/me")
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await merchants.me()

    t.deepEqual(r, okResponse)
})
