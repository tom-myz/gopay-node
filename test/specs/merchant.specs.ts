import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Merchants } from "../../src/resources/Merchants"
import { Scope } from "~nock/index"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { SDKError } from "../../src/errors/SDKError"

describe("Merchants", () => {
    let api: RestAPI
    let merchants: Merchants
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        merchants = new Merchants(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /merchants", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get("/merchants")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return merchants.list().should.eventually.eql(okResponse)
        })
    })

    context("route POST /merchants", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post("/merchants")
                .once()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = {
                name     : "test",
                email    : "test@test.com",
                password : "1234567890",
                roles    : ["merchant"]
            }

            return merchants.create(data).should.eventually.eql(okResponse)
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                { name: "", email: "", password: "" },
                { name: "test", email: "test", password: "1234" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return merchants.create(a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route GET /merchants/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/merchants\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return merchants.get("1").should.eventually.eql(okResponse)
        })
    })

    context("route PATCH /merchants/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch(/merchants\/[a-f0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })
            const data = { email : "test@test.com" }

            return merchants.update("1", data).should.eventually.eql(okResponse)
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                { email : "test" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return merchants.update("1", a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route DELETE /merchants/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "delete" }
            const scopeScope = scope
                .delete(/merchants\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return merchants.delete("1").should.eventually.eql(okResponse)
        })
    })

})
