import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Merchant } from "../../src/resources/merchants/Merchant"
import { Merchants } from "../../src/resources/merchants/Merchants"
import { Scope } from "~nock/index"
import { CommonError } from "../../src/errors/CommonError"
import { ValidationError } from "../../src/errors/ValidationError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import {ResponseError} from "../../src/errors/ResponseError";

describe("Merchant", () => {

    let api:RestAPI
    let merchant:Merchant
    let merchants:Merchants
    let scope:Scope

    beforeEach(() => {
        api = new RestAPI({endpoint: "/", token : "token"})
        merchant = new Merchant(api)
        merchants = new Merchants(api)
        scope = nock("http://localhost:80")
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it("should call the api to create merchant", () => {
        const okResponse = { status : "created" }
        const okScope = scope
            .post("/merchants")
            .reply(201, okResponse, { "Content-Type" : "application/json" })
        const data = {
            email    : "test@test.com",
            password : "testtest"
        }

        return merchant.create({ data }).should.eventually.eql(okResponse)
    })

    it("should not call api if request data is invalid", () => {
        const asserts: Array<any> = [
            [{ email: "", password: "" }, [{ email : "REQUIRED_VALUE" }, { password : "REQUIRED_VALUE" } ]],
            [{ email: "test", password: "test" }, [{ email : "INVALID_FORMAT_EMAIL" }, { password : "INVALID_FORMAT_LENGTH_BETWEEN" } ]]
        ]

        return Promise.all(
            asserts.map((a) => {
                return merchant.create({ data : a[0] }).should.be.rejected.then((e: CommonError) => {
                    expect(e).to.be.an.instanceOf(ValidationError)
                    expect(e.code).to.equal(VALIDATION_ERROR)
                    expect(e.errors).to.eql(a[1])
                })
            })
        )
    })

    it("should call api for single merchant", () => {
        const okResponse = { status : "read" }
        const scopeScope = scope
            .get(/merchants\/[a-f-0-9\-]+$/)
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return merchant.read({ id : "123" }).should.eventually.eql(okResponse)
    })

    it("should call api to update merchant", () => {
        const okResponse = { status : "updated" }
        const scopeScope = scope
            .patch(/merchants\/[a-f-0-9\-]+$/)
            .reply(200, okResponse, { "Content-Type" : "application/json" })
        const data = {}

        return merchant.update({ id : "123", data }).should.eventually.eql(okResponse)
    })

    it("should call api to delete merchant", () => {
        const scopeScope = scope
            .delete(/merchants\/[a-f-0-9\-]+$/)
            .reply(204, null)

        return merchant.delete({ id : "123" }).should.eventually.be.null
    })

    it("should call api for list of merchants", () => {
        const okResponse = { status : "read" }
        const scopeScope = scope
            .get("/merchants")
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return merchants.read().should.eventually.eql(okResponse)
    })

})
