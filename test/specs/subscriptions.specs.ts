import "../utils"
import { test, TestContext } from "ava"
import { expect } from "chai"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import {
    Subscriptions, SubscriptionCreateParams, SubscriptionUpdateParams,
    SubscriptionPeriod
} from "../../src/resources/Subscriptions"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

let api: RestAPI
let subscriptions: Subscriptions
let scope: Scope
const testEndpoint = "http://localhost:80"

test.beforeEach(() => {
    api = new RestAPI({endpoint: testEndpoint })
    subscriptions = new Subscriptions(api)
    scope = nock(testEndpoint)
})

test("route GET /stores/:storeId/subscriptions # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "list" }
    const okScope = scope
        .get(/(\/stores\/[a-f-0-9\-]+)?\/subscriptions$/i)
        .twice()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const [r1, r2]: any[] = await Promise.all([
        subscriptions.list(),
        subscriptions.list(null, null, "1")
    ])

    t.deepEqual(r1, okResponse)
    t.deepEqual(r2, okResponse)
})

test("route POST /subscriptions # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "create" }
    const okScope = scope
        .post("/subscriptions")
        .once()
        .reply(201, okResponse, { "Content-Type" : "application/json" })
    const data: SubscriptionCreateParams = {
        transactionTokenId : "test",
        amount             : 1,
        currency           : "usd",
        period             : SubscriptionPeriod.MONTHLY
    }

    const r: any = await subscriptions.create(data)

    t.deepEqual(r, okResponse)
})

test("route POST /subscriptions # should return validation error if data is invalid", (t: TestContext) => {
    const asserts = [
        {}
    ]

    return Promise.all(asserts.map(async (a: any) => {
        const e: ErrorResponse = await t.throws(subscriptions.create(a))
        t.deepEqual(e.code, VALIDATION_ERROR)
    }))
})

test("route PATCH /subscriptions/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "update" }
    const okScope = scope
        .patch(/\/stores\/[a-f-0-9\-]+\/subscriptions\/[a-f-0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })
    const data: SubscriptionUpdateParams = {
        transactionTokenId : "test",
        amount             : 10
    }

    const r: any = await subscriptions.update("1", "1", data)

    t.deepEqual(r, okResponse)
})

test("route GET /stores/:storeId/subscriptions/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "read" }
    const scopeScope = scope
        .get(/\/stores\/[a-f-0-9\-]+\/subscriptions\/[a-f-0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await subscriptions.get("1", "1")

    t.deepEqual(r, okResponse)
})

test("route DELETE /stores/:storeId/subscriptions/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "delete" }
    const scopeScope = scope
        .delete(/\/stores\/[a-f-0-9\-]+\/subscriptions\/[a-f-0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await subscriptions.delete("1", "1")

    t.deepEqual(r, okResponse)
})

test("route GET /stores/:storeId/subscriptions/:id/charges # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "list" }
    const scopeScope = scope
        .get(/\/stores\/[a-f-0-9\-]+\/subscriptions\/[a-f-0-9\-]+\/charges$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await subscriptions.charges("1", "1")

    t.deepEqual(r, okResponse)
})
