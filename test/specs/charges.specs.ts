import "../utils"
import { expect } from "chai"
import * as sinon from "sinon"
import { SinonSandbox } from "sinon"
import * as nock from "nock"
import { Scope } from "nock"
import { RestAPI, ErrorResponse } from "../../src/api/RestAPI"
import { Charges } from "../../src/resources/Charges"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { POLLING_INTERVAL } from "../../src/constants"

describe("Charges", () => {
    let api: RestAPI
    let charges: Charges
    let scope: Scope
    const testEndpoint = "http://localhost:80"
    let sandbox: SinonSandbox

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        charges = new Charges(api)
        scope = nock(testEndpoint)
        sandbox = sinon.sandbox.create({
            properties: ["spy", "clock"],
            useFakeTimers: true
        })
    })

    afterEach(() => {
        nock.cleanAll()
        sandbox.restore()
    })

    context("route GET /stores/:storeId/charges", () => {
        it("should return correct response", () => {
            const okResponse = { action : "list" }
            const okScope = scope
                .get(/\/stores\/[a-f-0-9\-]+\/charges$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return charges.list("1").should.eventually.eql(okResponse)
        })
    })

    context("route POST /charges", () => {
        it("should return correct response", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post("/charges")
                .once()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = {
                token    : "test",
                amount   : 1,
                currency : "usd"
            }

            return charges.create(data).should.eventually.eql(okResponse)
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                {}
            ]

            return Promise.all(asserts.map((a: any) => {
                return charges.create(a).should.be.rejected
                    .then((e: ErrorResponse) => expect(e.code).to.equal(VALIDATION_ERROR))
            }))
        })
    })

    context("route GET /stores/:storeId/charges/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/\/stores\/[a-f-0-9\-]+\/charges\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return charges.get("1", "1").should.eventually.eql(okResponse)
        })

        it("should perform long polling until charge is processed", () => {
            const spy = sandbox.spy(global, "fetch")
            const scopeScope = scope
                .get(/\/stores\/[a-f-0-9\-]+\/charges\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, () => ({ status : "success" }), { "Content-Type" : "application/json" })

            const result = charges.poll("1", "1").should.eventually.eql({ status : "success" })
                .then(() => expect(spy).to.have.been.calledOnce)

            sandbox.clock.tick(POLLING_INTERVAL)

            return result
        })
    })

})
