import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { TransactionToken } from "../../src/resources/charges/TransactionToken"
import { Scope } from "~nock/index"
import { CommonError } from "../../src/errors/CommonError"
import { ValidationError } from "../../src/errors/ValidationError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import {ResponseError} from "../../src/errors/ResponseError"
import {RequestError} from "../../src/errors/RequestError"
import {ParamsTokenCreate} from "../../src/resources/charges/TransactionToken"

describe("Transaction Token", () => {

    let api:RestAPI
    let token:TransactionToken
    let scope:Scope

    beforeEach(() => {
        api = new RestAPI({endpoint: "/", token : "token" })
        token = new TransactionToken(api)
        scope = nock("http://localhost:80")
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it("should not allow to call forbidden actions", () => {
        return token.update().should.be.rejected.then((e: CommonError) => {
            expect(e).to.be.an.instanceOf(RequestError)
            expect(e.code).to.equal("ACTION_NOT_PERMITTED")
        })
    })

    it("should call the api with card data and get successful response", () => {
        const okResponse = { status : "created" }
        const okScope = scope
            .post("/tokens")
            .reply(201, okResponse, { "Content-Type" : "application/json" })

        const data = {
            storeId: "f76600fd-51db-4dab-aa8e-5cb0d28c4116",
            type: "card",
            data : {
                cardNumber : "4111111111111111",
                expMonth   : "12",
                expYear    : "2020",
                cvv        : "123"
            }
        }

        return token.create({ data }).should.eventually.eql(okResponse)
    })

    it("should not call api if request data is invalid", () => {
        const asserts: Array<any> = [
            [
                {
                    storeId : "",
                    type: "",
                    data : { cardNumber: "", expMonth: "", expYear: "", cvv : "" }
                },
                [
                    { storeId : "REQUIRED_VALUE"},
                    { type : "REQUIRED_VALUE" }
                ]
            ],
            [
                {
                    storeId : "q",
                    type: "card",
                    data : { cardNumber: "", expMonth: "", expYear: "", cvv : "" }
                },
                [
                    { storeId : "INVALID_FORMAT_UUID"},
                    { "data.cardNumber" : "REQUIRED_VALUE" },
                    { "data.cvv" : "REQUIRED_VALUE" },
                    { "data.expMonth" : "REQUIRED_VALUE" },
                    { "data.expYear" : "REQUIRED_VALUE" }
                ]
            ],
            [
                {
                    storeId : "f76600fd-51db-4dab-aa8e-5cb0d28c4116",
                    type: "card",
                    data : { cardNumber: "a", expMonth: "a", expYear: "a", cvv : "a" }
                },
                [
                    { "data.cardNumber" : "INVALID_FORMAT_CARD_NUMBER" },
                    { "data.cvv" : "INVALID_FORMAT_NUMERIC" },
                    { "data.expMonth" : "INVALID_FORMAT_NUMERIC" },
                    { "data.expYear" : "INVALID_FORMAT_NUMERIC" }
                ]
            ]
        ]

        return Promise.all(
            asserts.map((a) => {
                return token.create({ data : a[0] }).should.be.rejected.then((e: CommonError) => {
                    expect(e).to.be.an.instanceOf(ValidationError)
                    expect(e.code).to.equal(VALIDATION_ERROR)
                    expect(e.errors).to.eql(a[1])
                })
            })
        )
    })

    it("should call api for single token", () => {
        const okResponse = { status : "read" }
        const okScope = scope
            .get(/tokens\/[a-f0-9\-]+$/i)
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return token.read({ id : "123" }).should.eventually.eql(okResponse)
    })

    it("should call the api to delete token", () => {
        const okScope = scope
            .delete(/tokens\/[a-f0-9\-]+$/i)
            .reply(204, null)

        return token.delete({ id : "1" }).should.eventually.be.null
    })

})
