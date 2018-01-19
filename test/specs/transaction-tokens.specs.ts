import "../utils"
import { test, TestContext } from "ava"
import nock = require("nock")
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { ResponseErrorCode } from "../../src/errors/APIError"
import {
    PaymentType,
    TransactionTokenCreateParams, TransactionTokens, TransactionTokenType
} from "../../src/resources/TransactionTokens"

let api: RestAPI
let tokens: TransactionTokens
let scope: Scope
const testEndpoint = "http://localhost:80"

test.beforeEach(() => {
    api = new RestAPI({endpoint: testEndpoint })
    tokens = new TransactionTokens(api)
    scope = nock(testEndpoint)
})

test("route POST /tokens # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "create" }
    const okScope = scope
        .post("/tokens")
        .once()
        .reply(201, okResponse, { "Content-Type" : "application/json" })

    const data: TransactionTokenCreateParams = {
        paymentType: PaymentType.CARD,
        email: "test",
        type: TransactionTokenType.ONE_TIME,
        data: {} as any
    }

    const r: any = await tokens.create(data)

    t.deepEqual(r, okResponse)
})

test("route POST /tokens # should return validation error if data is invalid", (t: TestContext) => {
    const asserts = [
        {}
    ]

    return Promise.all(asserts.map(async (a: any) => {
        const e: ErrorResponse = await t.throws(tokens.create(a))
        t.deepEqual(e.code, ResponseErrorCode.ValidationError)
    }))
})

test("route GET /stores/:storeId/tokens/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "get" }
    const okScope = scope
        .get(/\/stores\/[a-f-0-9\-]+\/tokens\/[a-f0-9]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await tokens.get("1", null, null, "1")

    t.deepEqual(r, okResponse)
})
