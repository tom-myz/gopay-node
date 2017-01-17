import "../utils"
import { expect } from "chai"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { Stores } from "../../src/resources/Stores"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

describe("Stores", () => {
    let api: RestAPI
    let stores: Stores
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        stores = new Stores(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route GET /stores", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get("/stores")
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return stores.list().should.eventually.eql(okResponse)
        })
    })

    context("route POST /stores", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post("/stores")
                .once()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = {
                name : "test"
            }

            return stores.create(data).should.eventually.eql(okResponse)
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                {}
            ]

            return Promise.all(asserts.map((a: any) => {
                return stores.create(a).should.be.rejected
                    .then((e: ErrorResponse) => expect(e.code).to.equal(VALIDATION_ERROR))
            }))
        })
    })

    context("route GET /stores/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/\/stores\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return stores.get("1").should.eventually.eql(okResponse)
        })
    })

    context("route PATCH /stores/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "update" }
            const okScope = scope
                .patch(/\/stores\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })
            const data = { name : "test" }

            return stores.update("1", data).should.eventually.eql(okResponse)
        })
    })

    context("route DELETE /stores/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .delete(/\/stores\/[a-f-0-9\-]+$/i)
                .once()
                .reply(204, okResponse, { "Content-Type" : "application/json" })

            return stores.delete("1").should.eventually.eql(okResponse)
        })
    })

})
