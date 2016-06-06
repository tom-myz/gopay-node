import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Merchant } from "../../src/resources/merchants/Merchant"
import { Scope } from "~nock/index"
import { CommonError } from "../../src/errors/CommonError"
import { ValidationError } from "../../src/errors/ValidationError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import {ResponseError} from "../../src/errors/ResponseError";

describe("Merchant", () => {

    let api:RestAPI
    let merchant:Merchant
    let scope:Scope

    beforeEach(() => {
        api = new RestAPI({endpoint: "/"})
        merchant = new Merchant(api)
        scope = nock("http://localhost:80")
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it("should return merchant response", () => {
        const merchantData = {
            id: "1",

        }
        const merchantScope = scope
            .get("/1")
            .reply(200, merchantData, { "Content-Type" : "application/json" })
    })

})
