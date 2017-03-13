import "../utils"
import { test, AssertContext } from "ava"
import { expect } from "chai"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { Verification } from "../../src/resources/Verification"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

let api: RestAPI
let verification: Verification
let scope: Scope
const testEndpoint = "http://localhost:80"

test.before(() => {
    api = new RestAPI({endpoint: testEndpoint })
    verification = new Verification(api)
    scope = nock(testEndpoint)
})

test.always.after(() => {
    nock.cleanAll()
})

test("route GET /verification # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "get" }
    const okScope = scope
        .get("/verification")
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await t.notThrows(verification.get())

    t.deepEqual(r, okResponse)
})

test("route POST /verification # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "create" }
    const okScope = scope
        .post("/verification")
        .once()
        .reply(201, okResponse, { "Content-Type" : "application/json" })

    const data = {
        homepageUrl: "test",
        companyDescription: "test",
        companyContactInfo: {},
        businessType: "test",
        systemManagerName: "test"
    }

    const r: any = await t.notThrows(verification.create(data))

    t.deepEqual(r, okResponse)
})

test("route POST /verification # should return validation error if data is invalid", (t: AssertContext) => {
    const asserts = [
        {}
    ]

    return Promise.all(asserts.map(async (a: any) => {
        const e: ErrorResponse = await t.throws(verification.create(a))
        t.deepEqual(e.code, VALIDATION_ERROR)
    }))
})

test("route PATCH /verification # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "update" }
    const okScope = scope
        .patch("/verification")
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const data: any = null

    const r: any = await t.notThrows(verification.update(data))

    t.deepEqual(r, okResponse)
})
