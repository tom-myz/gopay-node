import "../utils"
import { test, TestContext } from "ava"
import { expect } from "chai"
import nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { ResponseErrorCode } from "../../src/errors/APIError"
import { Verification } from "../../src/resources/Verification"

let api: RestAPI
let verification: Verification
let scope: Scope
const testEndpoint = "http://localhost:80"

test.beforeEach(() => {
    api = new RestAPI({endpoint: testEndpoint })
    verification = new Verification(api)
    scope = nock(testEndpoint)
})

test("route GET /verification # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "get" }
    const okScope = scope
        .get("/verification")
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await verification.get()

    t.deepEqual(r, okResponse)
})

test("route POST /verification # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "create" }
    const okScope = scope
        .post("/verification")
        .once()
        .reply(201, okResponse, { "Content-Type" : "application/json" })

    const data = {
        homepageUrl: "test",
        companyDescription: "test",
        companyContactInfo: {} as any,
        businessType: "test",
        systemManagerName: "test"
    }

    const r: any = await verification.create(data)

    t.deepEqual(r, okResponse)
})

test("route POST /verification # should return validation error if data is invalid", (t: TestContext) => {
    const asserts = [
        {}
    ]

    return Promise.all(asserts.map(async (a: any) => {
        const e: ErrorResponse = await t.throws(verification.create(a))
        t.deepEqual(e.code, ResponseErrorCode.ValidationError)
    }))
})

test("route PATCH /verification # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "update" }
    const okScope = scope
        .patch("/verification")
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const data: any = null

    const r: any = await verification.update(data)

    t.deepEqual(r, okResponse)
})
