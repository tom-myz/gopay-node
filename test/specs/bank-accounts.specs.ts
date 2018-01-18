import "../utils"
import { test, TestContext } from "ava"
import nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { ResponseErrorCode } from "../../src/errors/APIError"
import { BankAccounts, BankAccountType } from "../../src/resources/BankAccounts"

let api: RestAPI
let accounts: BankAccounts
let scope: Scope
const testEndpoint = "http://localhost:80"

test.beforeEach(() => {
    api = new RestAPI({endpoint: testEndpoint })
    accounts = new BankAccounts(api)
    scope = nock(testEndpoint)
})

test("route GET /bank_accounts # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "list" }
    const okScope = scope
        .get("/bank_accounts")
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await accounts.list()

    t.deepEqual(r, okResponse)
})

test("route POST /bank_accounts # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "create" }
    const okScope = scope
        .post("/bank_accounts")
        .once()
        .reply(201, okResponse, { "Content-Type" : "application/json" })
    const data = {
        accountNumber : "test",
        country       : "test",
        currency      : "test",
        holderName    : "test",
        bankName      : "test",
        accountType   : "checking" as BankAccountType
    }

    const r: any = await accounts.create(data)

    t.deepEqual(r, okResponse)
})

test("route POST /bank_accounts # should return validation error if data is invalid", (t: TestContext) => {
    const asserts = [
        {}
    ]

    return Promise.all(asserts.map(async (a: any) => {
        const e: ErrorResponse = await t.throws(accounts.create(a))
        t.deepEqual(e.code, ResponseErrorCode.ValidationError)
    }))
})

test("route GET /bank_accounts/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "read" }
    const scopeScope = scope
        .get(/\/bank_accounts\/[a-f-0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await accounts.get("1")

    t.deepEqual(r, okResponse)
})

test("route GET /bank_accounts/primary # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "read" }
    const scopeScope = scope
        .get("/bank_accounts/primary")
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await accounts.getPrimary()

    t.deepEqual(r, okResponse)
})

test("route PATCH /bank_accounts/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "update" }
    const okScope = scope
        .patch(/\/bank_accounts\/[a-f-0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })
    const data: any = null

    const r: any = await accounts.update("1", data)

    t.deepEqual(r, okResponse)
})

test("route DELETE /bank_accounts/:id # should return correct response", async (t: TestContext) => {
    const okResponse = { action : "read" }
    const scopeScope = scope
        .delete(/\/bank_accounts\/[a-f-0-9\-]+$/i)
        .once()
        .reply(204, okResponse, { "Content-Type" : "application/json" })

    const r: any = await accounts.delete("1")

    t.deepEqual(r, okResponse)
})
