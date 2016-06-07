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
        api = new RestAPI({endpoint: "/", token : "token"})
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

    it("should call api for single store configuration", () => {
        const okResponse = { status : "read" }
        const okScope = scope
            .get(/(merchants\/[a-f0-9\-]+\/)?stores\/[a-f0-9\-]+\/configuration$/i)
            .twice()
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return Promise.all([
            configuration.read({ storeId : "123" }).should.eventually.eql(okResponse),
            configuration.read({ merchantId: "1", storeId : "123" }).should.eventually.eql(okResponse)
        ])
    })

    it("should call the api to update store configuration", () => {
        const okResponse = { status : "updated" }
        const okScope = scope
            .patch(/(merchants\/[a-f0-9\-]+\/)?stores\/[a-f0-9\-]+\/configuration$/i)
            .twice()
            .reply(200, okResponse, { "Content-Type" : "application/json" })
        const data = {
            domains: ["test.com"]
        }

        return Promise.all([
            configuration.update({ storeId : "123", data }).should.eventually.eql(okResponse),
            configuration.update({ merchantId : "1", storeId : "123", data }).should.eventually.eql(okResponse)
        ])
    })

})
