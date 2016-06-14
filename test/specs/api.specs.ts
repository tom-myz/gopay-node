import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI, ResourceAccessType, RestAPIOptions } from "../../src/api/RestAPI"
import { Scope } from "~nock/index"
import { RequestError } from "../../src/errors/RequestError"
import { CommonError } from "../../src/errors/CommonError"
import { SDK_WRONG_CREDENTIALS } from "../../src/errors/ErrorsConstants"
import {ResponseError} from "../../src/errors/ResponseError";

describe("RestAPI", () => {

    afterEach(() => {
        nock.cleanAll()
    })

    it("should create headers without authorization", () => {
        const api: RestAPI = new RestAPI({ endpoint : "/" })
        const headers = api.getHeaders(ResourceAccessType.None)
        expect(headers).to.not.have.property("Authorization")
    })

    it("should create headers with token authorization header", () => {
        const api: RestAPI = new RestAPI({ endpoint : "/", token : "test" })
        const headers = api.getHeaders(ResourceAccessType.Token)
        expect(headers).to.have.property("Authorization")
            .and.equal("Token test")
    })

    it("should create headers with appId and secret authorization header", () => {
        const api: RestAPI = new RestAPI({ endpoint : "/", appId : "id", secret: "secret" })
        const headers = api.getHeaders(ResourceAccessType.Secret)
        expect(headers).to.have.property("Authorization")
            .and.equal("ApplicationToken id|secret")
    })

    it("should create headers with appId authorization header", () => {
        const api: RestAPI = new RestAPI({ endpoint : "/", appId : "id" })
        const headers = api.getHeaders(ResourceAccessType.AppId)
        expect(headers).to.have.property("Authorization")
            .and.equal("ApplicationToken id")
    })

    it("should create headers with token or secret authorization header with token prioritized", () => {
        const api1: RestAPI = new RestAPI({ endpoint : "/", appId : "id", secret : "secret" })
        const api2: RestAPI = new RestAPI({ endpoint : "/", token: "test" })
        const api3: RestAPI = new RestAPI({ endpoint : "/", token: "test", appId : "id", secret : "secret" })
        const headers1 = api1.getHeaders(ResourceAccessType.SecretOrToken)
        const headers2 = api2.getHeaders(ResourceAccessType.SecretOrToken)
        const headers3 = api3.getHeaders(ResourceAccessType.SecretOrToken)
        expect(headers1).to.have.property("Authorization")
            .and.equal("ApplicationToken id|secret")
        expect(headers2).to.have.property("Authorization")
            .and.equal("Token test")
        expect(headers3).to.have.property("Authorization")
            .and.equal("Token test")
    })

    it("should correctly detect presence of authorization data", () => {
        const asserts: Array<any> = [
            [{ endpoint : "/" }, ResourceAccessType.None, true],
            [{ endpoint : "/", token: "test" }, ResourceAccessType.Token, true],
            [{ endpoint : "/", token: "test", appId : "id", secret : "secret" }, ResourceAccessType.Token, true],
            [{ endpoint : "/", appId : "id", secret : "secret" }, ResourceAccessType.Token, false],
            [{ endpoint : "/", appId : "id" }, ResourceAccessType.Token, false],
            [{ endpoint : "/" }, ResourceAccessType.Token, false],
            [{ endpoint : "/", token: "test", appId : "id", secret : "secret" }, ResourceAccessType.Secret, true],
            [{ endpoint : "/", appId : "id", secret : "secret" }, ResourceAccessType.Secret, true],
            [{ endpoint : "/", appId : "id" }, ResourceAccessType.Secret, false],
            [{ endpoint : "/" }, ResourceAccessType.Secret, false],
            [{ endpoint : "/", token: "test" }, ResourceAccessType.SecretOrToken, true],
            [{ endpoint : "/", token: "test", appId : "id", secret : "secret" }, ResourceAccessType.SecretOrToken, true],
            [{ endpoint : "/", appId : "id", secret : "secret" }, ResourceAccessType.SecretOrToken, true],
            [{ endpoint : "/", appId : "id" }, ResourceAccessType.SecretOrToken, false],
            [{ endpoint : "/" }, ResourceAccessType.SecretOrToken, false],
            [{ endpoint : "/", token: "test" }, ResourceAccessType.AppId, false],
            [{ endpoint : "/", token: "test", appId : "id", secret : "secret" }, ResourceAccessType.AppId, true],
            [{ endpoint : "/", appId : "id", secret : "secret" }, ResourceAccessType.AppId, true],
            [{ endpoint : "/", appId : "id" }, ResourceAccessType.AppId, true],
            [{ endpoint : "/" }, ResourceAccessType.AppId, false]
        ]

        asserts.forEach((a) => {
            const api: RestAPI = new RestAPI(a[0])
            expect(api.hasCredentials(a[1])).to.equal(a[2])
        })
    })

    it("should return error if no correct authorization data is present", () => {
        const api: RestAPI = new RestAPI({ endpoint : "/" })
        const scope = nock("http://localhost:80")
            .get("/")
            .reply(200, null, { "Content-Type" : "application/json" })
        const promise = api.send({ method: "GET", url: "/" }, ResourceAccessType.Token)

        return promise.should.be.rejected
            .then((e: CommonError) => {
                expect(e).to.be.an.instanceOf(RequestError)
                expect(e.code).to.equal(SDK_WRONG_CREDENTIALS)
            })
    })

    it("should call the api and return correct response", () => {
        const api: RestAPI = new RestAPI({ endpoint : "/", token : "test" })
        const response = { success : true }
        const scope = nock("http://localhost:80")
            .get("/")
            .reply(200, response, { "Content-Type" : "application/json" })
        const promise = api.send({ method: "GET", url: "/" }, ResourceAccessType.Token)

        return promise.should.eventually.eql(response)
    })

    it("should return responses in underscore format", () => {
        const api: RestAPI = new RestAPI({ endpoint : "/", camel : false })
        const response = { some_value : true }
        const scope = nock("http://localhost:80")
            .get("/")
            .reply(200, response, { "Content-Type" : "application/json" })
        const promise = api.send({ method: "GET", url: "/" }, ResourceAccessType.None)
        return promise.should.eventually.eql({ some_value : true })
    })

    it("should return responses in camelCase format", () => {
        const api: RestAPI = new RestAPI({ endpoint : "/", camel : true })
        const response = { some_value : true }
        const scope = nock("http://localhost:80")
            .get("/")
            .reply(200, response, { "Content-Type" : "application/json" })
        const promise = api.send({ method: "GET", url: "/" }, ResourceAccessType.None)
        return promise.should.eventually.eql({ someValue : true })
    })

    it("should return error when api returns error response", () => {
        const api: RestAPI = new RestAPI({ endpoint : "/" })
        const scope = nock("http://localhost:80")
            .get("/")
            .reply(400, null)
        const promise = api.send({ method: "GET", url: "/" }, ResourceAccessType.None)
        return promise.should.be.rejectedWith(ResponseError)
    })

})
