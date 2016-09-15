import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { Verification } from "../../src/resources/Verification"
import { Scope } from "nock"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

describe("Stores", () => {
    let api: RestAPI
    let verification: Verification
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        verification = new Verification(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /verification", () => {
        it("should return correct response", () => {
            const okResponse = { action : "get" }
            const okScope = scope
                .get("/verification")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return verification.get().should.eventually.eql(okResponse)
        })
    })

    context("route POST /verification", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post("/verification")
                .once()
                .reply(201, okResponse, { "Content-Type" : "application/json" })

            const data: any = null

            return verification.create(data).should.eventually.eql(okResponse)
        })

        xit("should return validation error if data is invalid", () => {
            const asserts = [
                {}
            ]

            return Promise.all(asserts.map((a: any) => {
                return verification.create(a).should.be.rejected
                    .then((e: ErrorResponse) => expect(e.code).to.equal(VALIDATION_ERROR))
            }))
        })
    })

    context("route PATCH /verification", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch("/verification")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            const data: any = null

            return verification.update().should.eventually.eql(okResponse)
        })
    })

})
