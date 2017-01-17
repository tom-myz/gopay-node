"use strict"

import "../utils"
import { expect } from "chai"
import * as sinon from "sinon"
import { SinonSandbox } from "sinon"
import * as nock from "nock"
import { Scope } from "nock"
import { ENV_KEY_APP_ID, ENV_KEY_SECRET } from "../../src/constants"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { BAD_REQUEST } from "../../src/errors/ErrorsConstants"


describe("RestAPI", () => {
    let mockOk: Scope
    let mockError: Scope
    const testEndpoint = "http://localhost:80"
    let scope: Scope
    let sandbox: SinonSandbox

    before(() => {
        const REPEATS = 100
        scope = nock(testEndpoint)
        mockOk = scope
            .get("/ok")
            .times(REPEATS)
            .reply(200, { ok : true }, { "Content-Type" : "application/json" })

        mockError = scope
            .get("/error")
            .times(REPEATS)
            .reply(400, {}, { "Content-Type" : "application/json" })

        sandbox = sinon.sandbox.create({
            properties: ["spy", "clock"]
        })
    })

    after(() => {
        sandbox.restore()
        nock.cleanAll()
    })



    it("should create instance with proper parameters", () => {
        const asserts = [
            [{ endpoint : "/" }, "/", undefined, undefined],
            [{ endpoint : "/", appId: "id" }, "/", "id", undefined],
            [{ endpoint : "/", appId: "id", secret : "secret" }, "/", "id", "secret"],
            [{ endpoint : "/" }, "/", undefined, undefined]
        ]

        asserts.forEach((a: any) => {
            const api: RestAPI = new RestAPI(a[0])
            expect(api.endpoint).to.equal(a[1])
            expect(api.appId).to.equal(a[2])
            expect(api.secret).to.equal(a[3])
        })
    })

    it("should take appId and secret from environment variable", () => {
        process.env[ENV_KEY_APP_ID] = "envId"
        process.env[ENV_KEY_SECRET] = "envSecret"

        const api: RestAPI = new RestAPI({ endpoint : "/" })
        expect(api.appId).to.equal("envId")
        expect(api.secret).to.equal("envSecret")

        delete process.env[ENV_KEY_APP_ID]
        delete process.env[ENV_KEY_SECRET]
    })

    it("should send request to the api", function () {
        this.timeout(200)
        const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
        return api.send("GET", "/ok").should.eventually.be.fulfilled
            .then((r: any) => expect(r).to.eql({ ok : true }))
    })

    it("should send request with authorization header", function () {
        this.timeout(200)
        const asserts = [
            [{}, null, null],
            [{ appId : "id" }, null, "ApplicationToken id|"],
            [{ appId : "id", secret : "secret" }, null, "ApplicationToken id|secret"],
            [{ appId : "id", secret : "secret" }, { appId : "id1" }, "ApplicationToken id1|secret"],
            [{ appId : "id", secret : "secret" }, { secret : "secret1" }, "ApplicationToken id|secret1"],
        ]
        let mock: Scope

        const spy = sandbox.spy(global, "fetch")

        return Promise.all(asserts.map((a: any, i: number) => {
            const api: RestAPI = new RestAPI(Object.assign({}, { endpoint : testEndpoint }, a[0]))

            mock = scope
                .get("/header")
                .once()
                .reply(200, { ok : true }, Object.assign(
                    { "Content-Type" : "application/json" },
                    a[2] ? { "Authorization" : a[2] } : null
                ))

            return api.send("GET", "/header", a[1]).should.eventually.be.fulfilled
                .then((r: any) => {
                    if (!a[2]) {
                        expect((spy.getCall(i).args[0].headers as Headers).has("Authorization")).to.be.false
                    } else {
                        expect((spy.getCall(i).args[0].headers as Headers).get("Authorization")).to.equal(a[2])
                    }
                    expect(r).to.eql({ ok : true })
                })

        })).then(() => (global as any).fetch.restore())
    })

    it("should use callback to return result", function () {
        this.timeout(200)
        const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
        const spy = sinon.spy()

        return api.send("GET", "/ok", null, spy).should.eventually.be.fulfilled
            .then(() => expect(spy).to.have.been.calledOnce.and.calledWith({ ok : true }))
    })

    it("should return error response", function () {
        this.timeout(200)
        const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
        const spy = sinon.spy()
        const error: ErrorResponse = { code : BAD_REQUEST, errors : [], status : "error", httpCode : 400 }

        return api.send("GET", "/error", null, spy).should.eventually.be.rejected
            .then((e) => {
                expect(e).to.eql(error)
                expect(spy).to.have.been.calledOnce.and.calledWith(error)
            })
    })

    it("should convert all params to underscore", () => {
        const expectation = { foo: "bar", "fizz_buzz": true }
        const asserts = [
            { foo: "bar", "fizz_buzz": true },
            { foo: "bar", fizzBuzz: true }
        ]

        asserts.forEach((a: any) => {
            expect(RestAPI.requestParams(a)).to.eql(expectation)
        })
    })

    it("should return response with camel case properties names", function () {
        this.timeout(200)
        const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
        nock(testEndpoint)
            .get("/camel")
            .once()
            .reply(200, { "foo_bar" : true }, { "Content-Type" : "application/json" })

        return api.send("GET", "/camel").should.eventually.be.fulfilled
            .then((r: any) => expect(r).to.eql({ fooBar : true }))
    })

    it("should do long polling until condition is met", () => {
        const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
        let repeats = 3

        const promise: () => Promise<boolean> = () => new Promise((resolve: Function) => resolve(--repeats === 0))
        const spy = sandbox.spy(promise)

        const result = api.longPolling(
            spy,
            (result: boolean) => result === true,
            null,
            10
        )

        return expect(result).to.eventually.be.true
            .then(() => expect(spy).to.have.been.calledThrice)
    })
})
