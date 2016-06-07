import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Transfer } from "../../src/resources/transfers/Transfer"
import { Transfers } from "../../src/resources/transfers/Transfers"
import { Scope } from "~nock/index"
import { CommonError } from "../../src/errors/CommonError"
import { ValidationError } from "../../src/errors/ValidationError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import { ResponseError } from "../../src/errors/ResponseError"
import { RequestError } from "../../src/errors/RequestError"

describe("Transfer", () => {

    let api:RestAPI
    let transfer:Transfer
    let transfers:Transfers
    let scope:Scope

    beforeEach(() => {
        api = new RestAPI({endpoint: "/", token : "token"})
        transfer = new Transfer(api)
        transfers = new Transfers(api)
        scope = nock("http://localhost:80")
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it("should not allow to call forbidden actions", () => {
        return Promise.all([
            transfer.update().should.be.rejected.then((e: CommonError) => {
                expect(e).to.be.an.instanceOf(RequestError)
                expect(e.code).to.equal("ACTION_NOT_PERMITTED")
            }),
            transfer.delete().should.be.rejected.then((e: CommonError) => {
                expect(e).to.be.an.instanceOf(RequestError)
                expect(e.code).to.equal("ACTION_NOT_PERMITTED")
            })
        ])
    })

    it("should call the api to create transfer", () => {
        const okResponse = { status : "created" }
        const okScope = scope
            .post(/(merchants\/[a-f0-9\-]+\/)?transfers/i)
            .twice()
            .reply(201, okResponse, { "Content-Type" : "application/json" })
        const data = {
            daysPrior : 7
        }

        return Promise.all([
            transfer.create({ data }).should.eventually.eql(okResponse),
            transfer.create({ merchantId: "1", data }).should.eventually.eql(okResponse)
        ])
    })

    it("should not call api if request data is invalid", () => {
        const asserts: Array<any> = [
            [{ daysPrior: "" }, [{ daysPrior : "REQUIRED_VALUE" }]],
            [{ daysPrior: "a" }, [{ daysPrior : "INVALID_FORMAT_NUMERIC" }]]
        ]

        return Promise.all(
            asserts.map((a) => {
                return transfer.create({ data : a[0] }).should.be.rejected.then((e: CommonError) => {
                    expect(e).to.be.an.instanceOf(ValidationError)
                    expect(e.code).to.equal(VALIDATION_ERROR)
                    expect(e.errors).to.eql(a[1])
                })
            })
        )
    })

    it("should call api for single transfer", () => {
        const okResponse = { status : "read" }
        const scopeScope = scope
            .get(/(merchants\/[a-f-0-9\-]+\/)?transfers\/[a-f0-9\-]+$/i)
            .twice()
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return Promise.all([
            transfer.read({ id : "123" }).should.eventually.eql(okResponse),
            transfer.read({ merchantId: "1", id : "123" }).should.eventually.eql(okResponse)
        ])

    })

    it("should call api for list of transfers", () => {
        const okResponse = { status : "read" }
        const scopeScope = scope
            .get(/(merchants\/[a-f-0-9\-]+\/)?transfers?$/i)
            .twice()
            .reply(200, okResponse, { "Content-Type" : "application/json" })

        return Promise.all([
            transfers.read().should.eventually.eql(okResponse),
            transfers.read({ merchantId: "1"}).should.eventually.eql(okResponse)
        ])
    })

})
