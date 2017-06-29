import "../utils"
import { test, TestContext } from "ava"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { WebHooks } from "../../src/resources/WebHooks"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

let api: RestAPI
let webHooks: WebHooks
let scope: Scope
const testEndpoint = "http://localhost:80"

test.beforeEach(() => {
    api = new RestAPI({endpoint: testEndpoint })
    webHooks = new WebHooks(api)
    scope = nock(testEndpoint)
})

test("route GET /stores/:storeId/webhooks # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "list" }
    const okScope = scope
        .get(/\/stores\/[a-f-0-9\-]+\/webhooks$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await webHooks.list(null, null, "1")

    t.deepEqual(r, okResponse)
})

test("route POST /stores/:storeId/webhooks # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "create" }
    const okScope = scope
        .post(/\/stores\/[a-f-0-9\-]+\/webhooks$/i)
        .once()
        .reply(201, okResponse, { "Content-Type" : "application/json" })
    const data = {
        triggers: ["test"],
        url: "test"
    }

    const r: any = await webHooks.create(data, null, "1")

    t.deepEqual(r, okResponse)
})

test("route POST /stores/:storeId/webhooks # should return validation error if data is invalid", (t: TestContext) => {
    const asserts = [
        {}
    ]

    return Promise.all(asserts.map(async (a: any) => {
        const e: ErrorResponse = await t.throws(webHooks.create(a))
        t.deepEqual(e.code, VALIDATION_ERROR)
    }))
})

test("route GET /stores/:storeId/webhooks/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "read" }
    const scopeScope = scope
        .get(/\/stores\/[a-f-0-9\-]+\/webhooks\/[a-f-0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await webHooks.get("1", null, null, "1")

    t.deepEqual(r, okResponse)
})

test("route PATCH /stores/:storeId/webhooks/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "update" }
    const okScope = scope
        .patch(/\/stores\/[a-f-0-9\-]+\/webhooks\/[a-f-0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })
    const data = {
        triggers: ["test"],
        url: "test"
    }

    const r: any = await webHooks.update("1", data, null, "1")

    t.deepEqual(r, okResponse)
})

test("route DELETE /stores/:storeId/webhooks/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "read" }
    const scopeScope = scope
        .delete(/\/stores\/[a-f-0-9\-]+\/webhooks\/[a-f-0-9\-]+$/i)
        .once()
        .reply(204, okResponse, { "Content-Type" : "application/json" })

    const r: any = await webHooks.delete("1", null, null, "1")

    t.deepEqual(r, okResponse)
})
