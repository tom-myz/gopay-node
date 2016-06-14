import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Authorization, AuthorizationResponse } from "../../src/resources/Authorization"
import { Scope } from "~nock/index"
import { CommonError } from "../../src/errors/CommonError"
import { ValidationError } from "../../src/errors/ValidationError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"
import {ResponseError} from "../../src/errors/ResponseError";

describe("Authorization", () => {

    let api: RestAPI
    let authorization: Authorization
    let scope: Scope

    beforeEach(() => {
        api = new RestAPI({ endpoint : "/" })
        authorization = new Authorization(api)
        scope = nock("http://localhost:80")
    })

    afterEach(() => {
        nock.cleanAll()
    })

    it("should correctly authorize user with credentials", () => {
        const authScope = scope
            .post("/authenticate")
            .reply(200, { token : "token" }, { "Content-Type" : "application/json" })
        const params = {
            email: "test@test.com",
            password : "testtest"
        }
        const promise = authorization.authorize(params)

        return promise.should.eventually.be.fulfilled
            .then((response) => {
                expect(response).to.eql({ token : "token" })
                expect(api.token).to.equal("token")
            })
    })

    it("should return error if credentials hav invalid format", () => {
        const params1 = { email: "", password : "" }
        const params2 = { email: "test", password : "" }
        const params3 = { email: "test", password : "testtest" }
        const params4 = { email: "test@test.com", password : "" }

        return Promise.all([
            authorization.authorize(params1).should.be.rejected.then((e: CommonError) => {
                expect(e).to.be.an.instanceOf(ValidationError)
                expect(e.code).to.equal(VALIDATION_ERROR)
                expect(e.errors).to.eql([{ email : "REQUIRED_VALUE" }, { password : "REQUIRED_VALUE" }])
            }),
            authorization.authorize(params2).should.be.rejected.then((e: CommonError) => {
                expect(e).to.be.an.instanceOf(ValidationError)
                expect(e.code).to.equal(VALIDATION_ERROR)
                expect(e.errors).to.eql([{ email : "INVALID_FORMAT_EMAIL" }, { password : "REQUIRED_VALUE" }])
            }),
            authorization.authorize(params3).should.be.rejected.then((e: CommonError) => {
                expect(e).to.be.an.instanceOf(ValidationError)
                expect(e.code).to.equal(VALIDATION_ERROR)
                expect(e.errors).to.eql([{ email : "INVALID_FORMAT_EMAIL" }])
            }),
            authorization.authorize(params4).should.be.rejected.then((e: CommonError) => {
                expect(e).to.be.an.instanceOf(ValidationError)
                expect(e.code).to.equal(VALIDATION_ERROR)
                expect(e.errors).to.eql([{ password : "REQUIRED_VALUE" }])
            })
        ])
    })

    it("should return error for incorrect credentials response", () => {
        const authScope = scope
            .post("/authenticate")
            .reply(
                401,
                { status : "error", key : "INVALID_CREDENTIALS", errors : [] },
                { "Content-Type" : "application/json" }
            )
        const params = {
            email: "test@test.com",
            password : "testtest"
        }
        const promise = authorization.authorize(params)

        return promise.should.eventually.be.rejected
            .then((e: CommonError) => {
                expect(e).to.be.an.instanceOf(ResponseError)
                expect(e.code).to.equal("INVALID_CREDENTIALS")
            })
    })

})
