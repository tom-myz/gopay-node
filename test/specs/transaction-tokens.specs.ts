import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { TransactionTokens } from "../../src/resources/TransactionTokens"
import { Scope } from "nock"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { SDKError } from "../../src/errors/SDKError"

describe("Transaction tokens", () => {
    let api: RestAPI
    let tokens: TransactionTokens
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({endpoint: testEndpoint })
        tokens = new TransactionTokens(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route POST /tokens", () => {
        it("should return correct response for card", () => {
            const okResponse = { action : "create" }
            const okScope = scope
                .post("/tokens")
                .once()
                .reply(201, okResponse, { "Content-Type" : "application/json" })
            const data = {
                type : "card",
                data : {
                    cardholder : "Joe Doe",
                    cardNumber : "1234567890123456",
                    expMonth   : 12,
                    expYear    : 2020,
                    cvv        : "123"
                }
            }

            return tokens.create(data).should.eventually.eql(okResponse)
        })

        it("should return validation error if card data is invalid", () => {
            const asserts = [
                { type : "", data: "" },
                { type : "card", data : { cardholder : "", cardNumber : "", expMonth : "", expYear : "", cvv : "" } },
                { type : "card", data : { cardholder : "a", cardNumber : "a", expMonth : "a", expYear : "a", cvv : "a" } },
                { type : "card", data : { cardholder : "a", cardNumber : "1", expMonth : 1, expYear : 1, cvv : "12" } }
            ]

            return Promise.all(asserts.map((a: any) => {
                return tokens.create(a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })
    })

    context("route GET /tokens/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "read" }
            const scopeScope = scope
                .get(/tokens\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return tokens.get("1").should.eventually.eql(okResponse)
        })
    })

    context("route DELETE /tokens/:id", () => {
        it("should return correct response", () => {
            const okResponse = { action : "delete" }
            const scopeScope = scope
                .delete(/tokens\/[a-f-0-9\-]+$/i)
                .once()
                .reply(200, okResponse, { "Content-Type" : "application/json" })

            return tokens.delete("1").should.eventually.eql(okResponse)
        })
    })

})
