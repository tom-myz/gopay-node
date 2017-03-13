import "../utils"
import { test, AssertContext } from "ava"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { Refunds } from "../../src/resources/Refunds"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

let api: RestAPI
let refunds: Refunds
let scope: Scope
const testEndpoint = "http://localhost:80"

test.before(() => {
    api = new RestAPI({endpoint: testEndpoint })
    refunds = new Refunds(api)
    scope = nock(testEndpoint)
})

test.always.after(() => {
    nock.cleanAll()
})

test("route GET /stores/:storeId/charges/:chargeId/refunds # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "list" }
    const okScope = scope
        .get(/\/stores\/[a-f0-9\-]+\/charges\/[a-f0-9\-]+\/refunds$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await t.notThrows(refunds.list("1", "1"))

    t.deepEqual(r, okResponse)
})

test("route POST /stores/:storeId/charges/:chargeId/refunds # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "create" }
    const okScope = scope
        .post(/\/stores\/[a-f0-9\-]+\/charges\/[a-f0-9\-]+\/refunds$/i)
        .once()
        .reply(201, okResponse, { "Content-Type" : "application/json" })
    const data = {
        token    : "test",
        amount   : 1,
        currency : "usd"
    }

    const r: any = await t.notThrows(refunds.create("1", "1", data))

    t.deepEqual(r, okResponse)
})

test("route POST /stores/:storeId/charges/:chargeId/refunds # should return validation error if data is invalid", (t: AssertContext) => {
    const asserts = [
        {}
    ]

    return Promise.all(asserts.map(async (a: any) => {
        const e: ErrorResponse = await t.throws(refunds.create("1", "1", a))
        t.deepEqual(e.code, VALIDATION_ERROR)
    }))
})

test("route GET /stores/:storeId/charges/:chargeId/refunds/:id # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "read" }
    const scopeScope = scope
        .get(/\/stores\/[a-f0-9\-]+\/charges\/[a-f0-9\-]+\/refunds\/[a-z0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await t.notThrows(refunds.get("1", "1", "1"))

    t.deepEqual(r, okResponse)
})
