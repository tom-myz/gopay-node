import "../utils"
import { expect } from "chai"
import sinon = require("sinon")
import nock = require("nock")
import { RestAPI, RestAPIOptions, DEFAULT_ENV_APP_ID, DEFAULT_ENV_SECRET } from "../../src/api/RestAPI"
import { SDKError } from "../../src/errors/SDKError"
import { UNKNOWN } from "../../src/errors/ErrorsConstants"
import { Scope } from "nock"

describe("RestAPI", () => {
    let mockOk: Scope
    let mockError: Scope
    const testEndpoint = "http://localhost:80"

    before(() => {
        const REPEATS = 100
        const scope = nock(testEndpoint)
        mockOk = scope
            .get("/ok")
            .times(REPEATS)
            .reply(200, { ok : true }, { "Content-Type" : "application/json" })

        mockError = scope
            .get("/error")
            .times(REPEATS)
            .reply(400, { error : true }, { "Content-Type" : "application/json" })
    })

    after(() => {
        nock.cleanAll()
    })

    it("should create instance with proper parameters", () => {
        const asserts = [
            [{ endpoint : "/" }, "/", undefined, undefined, false],
            [{ endpoint : "/", appId: "id" }, "/", "id", undefined, false],
            [{ endpoint : "/", appId: "id", secret : "secret" }, "/", "id", "secret", false],
            [{ endpoint : "/", camel : true }, "/", undefined, undefined, true]
        ]

        asserts.forEach((a: any) => {
            const api: RestAPI = new RestAPI(a[0])
            expect(api.endpoint).to.equal(a[1])
            expect(api.appId).to.equal(a[2])
            expect(api.secret).to.equal(a[3])
            expect((api as any).camel).to.equal(a[4])
        })
    })

    it("should take appId and secret from environment variable", () => {
        process.env[DEFAULT_ENV_APP_ID] = "envId"
        process.env[DEFAULT_ENV_SECRET] = "envSecret"

        const api: RestAPI = new RestAPI({ endpoint : "/" })
        expect(api.appId).to.equal("envId")
        expect(api.secret).to.equal("envSecret")

        delete process.env[DEFAULT_ENV_APP_ID]
        delete process.env[DEFAULT_ENV_SECRET]
    })

    it("should set token for future use", () => {
        const api: RestAPI = new RestAPI({ endpoint : "/" })
        expect((api as any).token).to.be.empty
        api.setToken("token")
        expect((api as any).token).to.equal("token")
    })

    it("should send request to the api", function () {
        this.timeout(200)
        const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
        const req = { method : "GET", url: "/ok" }
        return api.send(req, () => null).should.eventually.be.fulfilled
            .then((r: any) => expect(r).to.eql({ ok : true }))
    })

    it("should send request with authorization header", function () {
        this.timeout(200)
        const asserts = [
            [{}, null, null, null],
            [{ appId : "id" }, null, null, "ApplicationToken id|"],
            [{ appId : "id", secret : "secret" }, null, null, "ApplicationToken id|secret"],
            [{}, "token1", null, "Token token1"],
            [{}, null, "token2", "Token token2"],
            [{}, "token1", "token2", "Token token2"]
        ]

        return Promise.all(asserts.map((a: any) => {
            const api: RestAPI = new RestAPI(Object.assign({}, { endpoint : testEndpoint }, a[0]))
            if (a[1]) {
                api.setToken(a[1])
            }
            const req = { method : "GET", url: "/ok" }
            const spy = sinon.spy(req, "set").withArgs("Authorization")

            return api.send(req, () => null, a[2]).should.eventually.be.fulfilled
                .then((r: any) => {
                    if (!a[3]) {
                        expect(spy).to.have.not.been.called
                    } else {
                        expect(spy).to.have.been.calledWith("Authorization", a[3])
                    }
                    expect(r).to.eql({ ok : true })
                })
                .then(() => (req as any).set.restore())
        }))
    })

    it("should use callback to return result", function () {
        this.timeout(200)
        const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
        const req = { method : "GET", url: "/ok" }
        const spy = sinon.spy()

        return api.send(req, spy).should.eventually.be.fulfilled
            .then(() => expect(spy).to.have.been.calledOnce.and.calledWith(null, { ok : true }))
    })

    it("should return SDKError for error response", function () {
        this.timeout(200)
        const api: RestAPI = new RestAPI({ endpoint : testEndpoint })
        const req = { method : "GET", url: "/error" }
        const spy = sinon.spy()
        const error: SDKError = { code : UNKNOWN, errors : [], status : 400, type : "response" }

        return api.send(req, spy).should.eventually.be.rejected
            .then((e) => {
                expect(e).to.eql(error)
                expect(spy).to.have.been.calledOnce.and.calledWith(error, null)
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

    it("should return response with camel case properties names if parameter is set", function () {
        this.timeout(200)
        const api: RestAPI = new RestAPI({ endpoint : testEndpoint, camel : true })
        const mock = nock(testEndpoint)
            .get("/camel")
            .once()
            .reply(200, { "foo_bar" : true }, { "Content-Type" : "application/json" })
        const req = { method : "GET", url: "/camel" }

        const error: SDKError = { code : UNKNOWN, errors : [], status : 400, type : "response" }

        return api.send(req, () => null).should.eventually.be.fulfilled
            .then((r: any) => expect(r).to.eql({ fooBar : true }))
    })
})
