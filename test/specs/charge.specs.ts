import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Charge } from "../../src/resources/charges/Charge"
import { Charges } from "../../src/resources/charges/Charges"
import { Scope } from "~nock/index"
import { CommonError } from "../../src/errors/CommonError"
import { ValidationError } from "../../src/errors/ValidationError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { ResponseError } from "../../src/errors/ResponseError"
import { RequestError } from "../../src/errors/RequestError"

describe("Charge", () => {

    let api:RestAPI
    let charge:Charge
    let charges:Charges
    let scope:Scope

    beforeEach(() => {
        api = new RestAPI({endpoint: "/", token : "token"})
        charge = new Charge(api)
        charges = new Charges(api)
        scope = nock("http://localhost:80")
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it("should not allow to call forbidden actions", () => {
        return charge.delete().should.be.rejected.then((e: CommonError) => {
            expect(e).to.be.an.instanceOf(RequestError)
            expect(e.code).to.equal("ACTION_NOT_PERMITTED")
        })
    })

    it("should call the api to create charge", () => {
        const okResponse = { status : "created" }
        const okScope = scope
            .post("/charges")
            .reply(201, okResponse, { "Content-Type" : "application/json" })
        const data = {
            token : "token",
            amount : 100.00,
            currency : "USD"
        }

        return charge.create({ data }).should.eventually.eql(okResponse)
    })

    it("should not call api if request data is invalid", () => {
        const asserts: Array<any> = [
            [{ token: "", amount: "", currency: "" }, [{ amount : "REQUIRED_VALUE" }, { currency : "REQUIRED_VALUE" }, { token : "REQUIRED_VALUE" }]],
            [{ token: "token", amount: "", currency: "" }, [{ amount : "REQUIRED_VALUE" }, { currency : "REQUIRED_VALUE" } ]],
            [{ token: "token", amount: "a", currency: "a" }, [{ amount : "INVALID_FORMAT_NUMERIC" }, { currency : "INVALID_FORMAT_LENGTH_MIN" } ]]
        ]

        return Promise.all(
            asserts.map((a) => {
                return charge.create({ data : a[0] }).should.be.rejected.then((e: CommonError) => {
                    expect(e).to.be.an.instanceOf(ValidationError)
                    expect(e.code).to.equal(VALIDATION_ERROR)
                    expect(e.errors).to.eql(a[1])
                })
            })
        )
    })

    it("should call api for single charge", () => {
        const okResponse = { status : "read" }
        const scopeScope = scope
            .get(/charges\/[a-f-0-9\-]+$/)
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return charge.read({ id : "123" }).should.eventually.eql(okResponse)
    })

    it("should call api to update charge", () => {
        const okResponse = { status : "updated" }
        const scopeScope = scope
            .patch(/charges\/[a-f-0-9\-]+$/)
            .reply(200, okResponse, { "Content-Type" : "application/json" })
        const data = {}

        return charge.update({ id : "123", data }).should.eventually.eql(okResponse)
    })

    it("should call api for list of charges", () => {
        const okResponse = { status : "read" }
        const scopeScope = scope
            .get("/charges")
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return charges.read().should.eventually.eql(okResponse)
    })

})
