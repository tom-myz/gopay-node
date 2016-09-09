import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Credentials } from "../../src/resources/Credentials"
import { Scope } from "nock"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { SDKError } from "../../src/errors/SDKError"
import {cursorTo} from "readline";

describe("Credentials", () => {
    let api: RestAPI
    let credentials: Credentials
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        credentials = new Credentials(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /merchants/:merchantId/credentials", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/(merchants\/[a-f0-9\-]+\/)?credentials$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                credentials.list().should.eventually.eql(okResponse),
                credentials.list(null, null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route POST /merchants/:merchantId/credentials", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post(/(merchants\/[a-f0-9\-]+\/)?credentials$/i)
                .twice()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = {
                gateway     : "test",
                currencies  : ["jpy"],
                credentials : { foo : "bar" }
            }

            return Promise.all([
                credentials.create(data).should.eventually.eql(okResponse),
                credentials.create(data, null, "1").should.eventually.eql(okResponse),
            ])
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                { gateway: "" },
                { gateway: "test", currencies: "" },
                { gateway: "test", currencies: ["jpy"], credentials: "test" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return credentials.create(a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route GET /merchants/:merchantId/credentials/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/(merchants\/[a-f0-9\-]+\/)?credentials\/[a-f-0-9\-]+$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                credentials.get("1").should.eventually.eql(okResponse),
                credentials.get("1", null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

    context("route PATCH /merchants/:merchantId/credentials/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch(/(merchants\/[a-f0-9\-]+\/)?credentials\/[a-f-0-9\-]+$/i)
                .twice()
                .reply(200, okResponse, { "Content-Type" : "application/json" })
            const data = { name : "test" }

            return Promise.all([
                credentials.update("1", data).should.eventually.eql(okResponse),
                credentials.update("1", data, null, "1").should.eventually.eql(okResponse)
            ])
        })
    })

    context("route DELETE /merchants/:merchantId/credentials/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .delete(/(merchants\/[a-f0-9\-]+\/)?credentials\/[a-f-0-9\-]+$/i)
                .twice()
                .reply(204, okResponse, { "Content-Type" : "application/json" })

            return Promise.all([
                credentials.delete("1").should.eventually.eql(okResponse),
                credentials.delete("1", null, "1").should.eventually.eql(okResponse),
            ])
        })
    })

})
