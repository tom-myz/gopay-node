import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Payouts } from "../../src/resources/payouts/Payouts"
import { Scope } from "~nock/index"
import { CommonError } from "../../src/errors/CommonError"
import { ValidationError } from "../../src/errors/ValidationError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import {ResponseError} from "../../src/errors/ResponseError";

describe("Payouts", () => {

    let api:RestAPI
    let payouts:Payouts
    let scope:Scope

    beforeEach(() => {
        api = new RestAPI({endpoint: "/", token : "token"})
        payouts = new Payouts(api)
        scope = nock("http://localhost:80")
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it("should call api for list of payouts", () => {
        const okResponse = { status : "read" }
        const scopeScope = scope
            .get("/payouts")
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return payouts.read().should.eventually.eql(okResponse)
    })

})
