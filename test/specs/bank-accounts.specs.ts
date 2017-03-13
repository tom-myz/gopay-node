import "../utils"
import { test, AssertContext } from "ava"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { BankAccounts } from "../../src/resources/BankAccounts"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

let api: RestAPI
let accounts: BankAccounts
let scope: Scope
const testEndpoint = "http://localhost:80"

test.before(() => {
    api = new RestAPI({endpoint: testEndpoint })
    accounts = new BankAccounts(api)
    scope = nock(testEndpoint)
})

test.always.after(() => {
    nock.cleanAll()
})

test("route GET /bank_accounts # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "list" }
    const okScope = scope
        .get("/bank_accounts")
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await t.notThrows(accounts.list())

    t.deepEqual(r, okResponse)
})

test("route POST /bank_accounts # should return correct response", async (t: AssertContext) => {
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
        bankName      : "test"
    }

    const r: any = await t.notThrows(accounts.create(data))

    t.deepEqual(r, okResponse)
})

test("route POST /bank_accounts # should return validation error if data is invalid", (t: AssertContext) => {
    const asserts = [
        {}
    ]

    return Promise.all(asserts.map(async (a: any) => {
        const e: ErrorResponse = await t.throws(accounts.create(a))
        t.deepEqual(e.code, VALIDATION_ERROR)
    }))
})

test("route GET /bank_accounts/:id # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "read" }
    const scopeScope = scope
        .get(/\/bank_accounts\/[a-f-0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await t.notThrows(accounts.get("1"))

    t.deepEqual(r, okResponse)
})

test("route GET /bank_accounts/primary # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "read" }
    const scopeScope = scope
        .get("/bank_accounts/primary")
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })

    const r: any = await t.notThrows(accounts.getPrimary())

    t.deepEqual(r, okResponse)
})

test("route PATCH /bank_accounts/:id # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "update" }
    const okScope = scope
        .patch(/\/bank_accounts\/[a-f-0-9\-]+$/i)
        .once()
        .reply(200, okResponse, { "Content-Type" : "application/json" })
    const data: any = null

    const r: any = await t.notThrows(accounts.update("1", data))

    t.deepEqual(r, okResponse)
})

test("route DELETE /bank_accounts/:id # should return correct response", async (t: AssertContext) => {
    const okResponse = { action : "read" }
    const scopeScope = scope
        .delete(/\/bank_accounts\/[a-f-0-9\-]+$/i)
        .once()
        .reply(204, okResponse, { "Content-Type" : "application/json" })

    const r: any = await t.notThrows(accounts.delete("1"))

    t.deepEqual(r, okResponse)
})
