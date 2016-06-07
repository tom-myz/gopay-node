import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Store } from "../../src/resources/stores/Store"
import { Stores } from "../../src/resources/stores/Stores"
import { Scope } from "~nock/index"
import { CommonError } from "../../src/errors/CommonError"
import { ValidationError } from "../../src/errors/ValidationError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import {ResponseError} from "../../src/errors/ResponseError";

describe("Store", () => {

    let api:RestAPI
    let store:Store
    let stores:Stores
    let scope:Scope

    beforeEach(() => {
        api = new RestAPI({endpoint: "/", token : "token"})
        store = new Store(api)
        stores = new Stores(api)
        scope = nock("http://localhost:80")
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it("should call the api to create store", () => {
        const okResponse = { status : "created" }
        const okScope = scope
            .post(/(merchants\/[a-f0-9\-]+\/)?stores/i)
            .twice()
            .reply(201, okResponse, { "Content-Type" : "application/json" })
        const data = {
            name : "test"
        }

        return Promise.all([
            store.create({ data }).should.eventually.eql(okResponse),
            store.create({ merchantId: "1", data }).should.eventually.eql(okResponse)
        ])
    })

    it("should not call api if request data is invalid", () => {
        const asserts: Array<any> = [
            [{ name: "" }, [{ name : "REQUIRED_VALUE" }]]
        ]

        return Promise.all(
            asserts.map((a) => {
                return store.create({ data : a[0] }).should.be.rejected.then((e: CommonError) => {
                    expect(e).to.be.an.instanceOf(ValidationError)
                    expect(e.code).to.equal(VALIDATION_ERROR)
                    expect(e.errors).to.eql(a[1])
                })
            })
        )
    })

    it("should call api for single store", () => {
        const okResponse = { status : "read" }
        const scopeScope = scope
            .get(/(merchants\/[a-f-0-9\-]+\/)?stores\/[a-f0-9\-]+$/i)
            .twice()
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return Promise.all([
            store.read({ id : "123" }).should.eventually.eql(okResponse),
            store.read({ merchantId: "1", id : "123" }).should.eventually.eql(okResponse)
        ])
        
    })

    it("should call api to update store", () => {
        const okResponse = { status : "updated" }
        const scopeScope = scope
            .patch(/(merchants\/[a-f-0-9\-]+\/)?stores\/[a-f0-9\-]+$/i)
            .twice()
            .reply(200, okResponse, { "Content-Type" : "application/json" })
        const data = {}

        return Promise.all([
            store.update({ id : "123", data }).should.eventually.eql(okResponse),
            store.update({ merchantId: "1", id : "123", data }).should.eventually.eql(okResponse)
        ])
    })

    it("should call api to delete store", () => {
        const scopeScope = scope
            .delete(/(merchants\/[a-f-0-9\-]+\/)?stores\/[a-f0-9\-]+$/i)
            .twice()
            .reply(204, null)

        return Promise.all([
            store.delete({ id : "123" }).should.eventually.be.null,
            store.delete({ merchantId: "1", id : "123" }).should.eventually.be.null
        ])
    })

    it("should call api for list of stores", () => {
        const okResponse = { status : "read" }
        const scopeScope = scope
            .get(/(merchants\/[a-f-0-9\-]+\/)?stores?$/i)
            .twice()
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return Promise.all([
            stores.read().should.eventually.eql(okResponse),
            stores.read({ merchantId: "1"}).should.eventually.eql(okResponse)
        ])
    })

})
