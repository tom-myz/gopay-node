import "../utils"
import { test, TestContext } from "ava"
import nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { Ledgers } from "../../src/resources/Ledgers"

let api: RestAPI
let ledgers: Ledgers
let scope: Scope
const testEndpoint = "http://localhost:80"

test.beforeEach(() => {
    api = new RestAPI({ endpoint: testEndpoint })
    ledgers = new Ledgers(api)
    scope = nock(testEndpoint)
})

test("route GET /transfer/:transferId/ledgers # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "get" }
    const okScope = scope
        .get(/\/transfers\/[a-f-0-9\-]+\/ledgers$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await ledgers.list("1")

    t.deepEqual(r, okResponse)
})
