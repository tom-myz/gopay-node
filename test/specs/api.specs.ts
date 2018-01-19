import "../utils"
import { test, TestContext } from "ava"
import * as sinon from "sinon"
import { SinonSandbox } from "sinon"
import nock = require("nock")
import { Scope } from "nock"
import { ENV_KEY_APP_ID, ENV_KEY_SECRET } from "../../src/constants"
import { ResponseErrorCode, RequestErrorCode } from "../../src/errors/APIError"
import { RestAPI, ErrorResponse, HTTPMethod } from "../../src/api/RestAPI"

let mockOk: Scope
let mockError: Scope
let mockValidationError: Scope
const testEndpoint = "http://localhost:80"
let scope: Scope
let sandbox: SinonSandbox

test.beforeEach(() => {
    const REPEATS = 100
    scope = nock(testEndpoint).persist()
    mockOk = scope
        .get("/ok")
        .times(REPEATS)
        .reply(200, { ok : true }, { "Content-Type" : "application/json" })

    mockError = scope
        .get("/error")
        .times(REPEATS)
        .reply(400, {}, { "Content-Type" : "application/json" })

    mockValidationError = scope
        .get("/validation-error")
        .times(REPEATS)
        .reply(400,
            {
                status : "error",
                code : ResponseErrorCode.ValidationError,
                errors : [
                    { field : "currency", reason : ResponseErrorCode.UnsupportedCurrency }
                ]
            },
            { "Content-Type" : "application/json" }
        )

    sandbox = sinon.sandbox.create({
        properties: ["spy", "clock"]
    })
})

test("should create instance with proper parameters", (t: TestContext) => {
    const asserts = [
        [{ endpoint : "/" }, "/", undefined, undefined],
        [{ endpoint : "/", appId: "id" }, "/", "id", undefined],
        [{ endpoint : "/", appId: "id", secret : "secret" }, "/", "id", "secret"],
        [{ endpoint : "/" }, "/", undefined, undefined]
    ]

    asserts.forEach((a: any) => {
        const api: RestAPI = new RestAPI(a[0])
        t.is(api.endpoint, a[1])
        t.is(api.appId, a[2])
        t.is(api.secret, a[3])
    })
})

test("should take appId and secret from environment variable", (t: TestContext) => {
    process.env[ENV_KEY_APP_ID] = "envId"
    process.env[ENV_KEY_SECRET] = "envSecret"

    const api: RestAPI = new RestAPI({ endpoint : "/" })
    t.is(api.appId, "envId")
    t.is(api.secret, "envSecret")

    delete process.env[ENV_KEY_APP_ID]
    delete process.env[ENV_KEY_SECRET]
})

test("should send request to the api", async (t: TestContext) => {
    const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
    const r: any = await api.send(HTTPMethod.GET, "/ok")
    t.deepEqual(r, { ok : true })
})

test("should return error response", async (t: TestContext) => {
    const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
    const spy = sinon.spy()
    const error: ErrorResponse = { code : ResponseErrorCode.BadRequest, errors : [], status : "error", httpCode : 400 }
    const e = await t.throws(api.send(HTTPMethod.GET, "/error", null, spy))

    t.deepEqual(e, error)
    t.true(spy.calledOnce)
    t.true(spy.calledWith(error))
})

test("should return validation error response", async (t: TestContext) => {
    const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
    const spy = sinon.spy()
    const error: ErrorResponse = {
        httpCode : 400,
        status : "error",
        code : ResponseErrorCode.ValidationError,
        errors : [
            { field : "currency", reason : ResponseErrorCode.UnsupportedCurrency }
        ]
    }
    const e = await t.throws(api.send(HTTPMethod.GET, "/validation-error", null, spy))
    t.deepEqual(e, error)
    t.true(spy.calledOnce)
    t.true(spy.calledWith(error))
})

test.serial("should send request with authorization header", async (t: TestContext) => {
    const asserts = [
        [{}, null, null],
        [{ appId : "id" }, null, "ApplicationToken id|"],
        [{ appId : "id", secret : "secret" }, null, "ApplicationToken id|secret"],
        [{ appId : "id", secret : "secret" }, { appId : "id1" }, "ApplicationToken id1|secret"],
        [{ appId : "id", secret : "secret" }, { secret : "secret1" }, "ApplicationToken id|secret1"]
    ]
    let mock: Scope

    const spy = sandbox.spy(global as NodeJS.Global & GlobalFetch, "fetch")

    for (const a of asserts) {
        const api: RestAPI = new RestAPI({ endpoint : testEndpoint, ...a[0] })

        mock = scope
            .get("/header")
            .once()
            .reply(200, { ok : true }, Object.assign(
                { "Content-Type" : "application/json" },
                a[2] ? { Authorization : a[2] } : null
            ))

        const r: any = await api.send(HTTPMethod.GET, "/header", a[1])

        if (!a[2]) {
            t.false((spy.getCall(spy.callCount - 1).args[0].headers as Headers).has("Authorization"))
        } else {
            t.is((spy.getCall(spy.callCount - 1).args[0].headers as Headers).get("Authorization"), a[2])
        }
        t.deepEqual(r, { ok : true })
    }

    (global as any).fetch.restore()
})

test.serial("should send request with idempotent key", async (t: TestContext) => {
    let mock: Scope

    const spy = sandbox.spy(global as NodeJS.Global & GlobalFetch, "fetch")

    const api: RestAPI = new RestAPI({ endpoint : testEndpoint })

    mock = scope
        .get("/header")
        .once()
        .reply(200, { ok : true }, Object.assign(
            { "Content-Type" : "application/json" }
        ))

    const r: any = await api.send(HTTPMethod.GET, "/header", { idempotentKey : "test" })

    t.is((spy.getCall(0).args[0].headers as Headers).get("Idempotency-Key"), "test")
    t.deepEqual(r, { ok : true });
    (global as any).fetch.restore()
})

test("should convert all params to underscore", (t: TestContext) => {
    const expectation = { foo: "bar", fizz_buzz: true }
    const asserts = [
        { foo: "bar", fizz_buzz: true },
        { foo: "bar", fizzBuzz: true }
    ]

    asserts.forEach((a: any) => {
        t.deepEqual(RestAPI.requestParams(a), expectation)
    })
})

test("should return response with camel case properties names", async (t: TestContext) => {
    const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
    nock(testEndpoint)
        .get("/camel")
        .once()
        .reply(200, { foo_bar : true }, { "Content-Type" : "application/json" })

    const r: any = await api.send(HTTPMethod.GET, "/camel")

    t.deepEqual(r, { fooBar : true })
})

test("should do long polling until condition is met", async (t: TestContext) => {
    const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
    let repeats = 3

    const promise: () => Promise<boolean> = () => new Promise((resolve: Function) => resolve(--repeats === 0))
    const spy = sandbox.spy(promise)

    const result = await api.longPolling(
        spy,
        (result: boolean) => result === true,
        null,
        10
    )

    t.true(result)
    t.true(spy.calledThrice)
})
