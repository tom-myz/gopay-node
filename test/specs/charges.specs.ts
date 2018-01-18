import "../utils"
import { test, TestContext } from "ava"
import { expect } from "chai"
import * as sinon from "sinon"
import { SinonSandbox } from "sinon"
import nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { ResponseErrorCode } from "../../src/errors/APIError"
import { Charges, ChargeItem } from "../../src/resources/Charges"
import { POLLING_INTERVAL } from "../../src/constants"

let api: RestAPI
let charges: Charges
let scope: Scope
const testEndpoint = "http://localhost:80"
let sandbox: SinonSandbox

test.beforeEach(() => {
    api = new RestAPI({endpoint: testEndpoint })
    charges = new Charges(api)
    scope = nock(testEndpoint)
    sandbox = sinon.sandbox.create({
        properties: ["spy", "clock"],
        useFakeTimers: true
    })
})

test("route GET /stores/:storeId/charges # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "list" }
    const okScope = scope
        .get(/\/stores\/[a-f-0-9\-]+\/charges$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await charges.list(null, null, "1")

    t.deepEqual(r, okResponse)
})

test("route POST /charges # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "create" }
    const okScope = scope
        .post("/charges")
        .once()
        .reply(201, okResponse, { "Content-Type" : "application/json" })
    const data = {
        transactionTokenId : "test",
        amount             : 1,
        currency           : "usd"
    }

    const r: any = await charges.create(data)

    t.deepEqual(r, okResponse)
})

test("route POST /charges # should return validation error if data is invalid", (t: TestContext) => {
    const asserts = [
        {}
    ]

    return Promise.all(asserts.map(async (a: any) => {
        const e: ErrorResponse = await t.throws(charges.create(a))
        t.deepEqual(e.code, ResponseErrorCode.ValidationError)
    }))
})

test("route GET /stores/:storeId/charges/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "read" }
    const scopeScope = scope
        .get(/\/stores\/[a-f-0-9\-]+\/charges\/[a-f-0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await charges.get("1", "1")

    t.deepEqual(r, okResponse)
})

test("route GET /stores/:storeId/charges/:id # should perform long polling until charge is processed", async (t: TestContext) => {
    const spy = sandbox.spy(global as NodeJS.Global & GlobalFetch, "fetch")
    const scopeScope = scope
        .get(/\/stores\/[a-f-0-9\-]+\/charges\/[a-f-0-9\-]+(.*)$/i)
        .once()
        .reply(200, () => ({ status : "success" }), { "Content-Type" : "application/json" })

    const promise = charges.poll("1", "1")

    sandbox.clock.tick(POLLING_INTERVAL)

    const result = await promise

    t.deepEqual(result, { status : "success" })

    expect(spy).to.have.been.calledOnce
})
