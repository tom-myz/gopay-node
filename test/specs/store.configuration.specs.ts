import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { StoreConfiguration } from "../../src/resources/stores/StoreConfiguration"
import { Scope } from "~nock/index"
import { CommonError } from "../../src/errors/CommonError"
import { ValidationError } from "../../src/errors/ValidationError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import {ResponseError} from "../../src/errors/ResponseError"
import {RequestError} from "../../src/errors/RequestError"

describe("Store Configuration", () => {

    let api:RestAPI
    let configuration:StoreConfiguration
    let scope:Scope

    beforeEach(() => {
        api = new RestAPI({endpoint: "/"})
        configuration = new StoreConfiguration(api)
        scope = nock("http://localhost:80")
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it("should not allow to call forbidden actions", () => {
        return Promise.all([
            configuration.create().should.be.rejected.then((e: CommonError) => {
                expect(e).to.be.an.instanceOf(RequestError)
                expect(e.code).to.equal("ACTION_NOT_PERMITTED")
            }),
            configuration.delete().should.be.rejected.then((e: CommonError) => {
                expect(e).to.be.an.instanceOf(RequestError)
                expect(e.code).to.equal("ACTION_NOT_PERMITTED")
            })
        ])
    })

})
