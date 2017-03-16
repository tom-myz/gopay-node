import "../utils"
import { test, TestContext } from "ava"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI } from "../../src/api/RestAPI"
import { Transfers } from "../../src/resources/Transfers"

let api: RestAPI
let transfers: Transfers
let scope: Scope
const testEndpoint = "http://localhost:80"

test.beforeEach(() => {
    api = new RestAPI({endpoint: testEndpoint })
    transfers = new Transfers(api)
    scope = nock(testEndpoint)
})

test.always.afterEach(() => {
    nock.cleanAll()
})

test("route GET /transfers # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "list" }
    const okScope = scope
        .get("/transfers")
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await t.notThrows(transfers.list())

    t.deepEqual(r, okResponse)
})

test("route GET /transfers/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "get" }
    const okScope = scope
        .get(/\/transfers\/[a-f0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await t.notThrows(transfers.get("1"))

    t.deepEqual(r, okResponse)
})
