import "../utils"
import { expect } from "chai"
import nock = require("nock")
import { RestAPI } from "../../src/api/RestAPI"
import { Authorization } from "../../src/resources/Authorization"
import { Scope } from "~nock/index"
import { SDKError } from "../../src/errors/SDKError"
import { VALIDATION_ERROR } from "../../src/errors/ErrorsConstants"

describe("Authorization", () => {
    let api: RestAPI
    let authorization: Authorization
    let scope: Scope
    const testEndpoint = "http://localhost:80"

    beforeEach(() => {
        api = new RestAPI({ endpoint : testEndpoint })
        authorization = new Authorization(api)
        scope = nock(testEndpoint)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    context("route POST /authenticate", () => {
        it("should correctly authorize user with credentials", function () {
            this.timeout(200)
            const authScope = scope
                .post("/authenticate")
                .reply(200, { action : "auth" }, { "Content-Type" : "application/json" })
            const params = {
                email: "test@test.com",
                password : "testtest"
            }
            const promise = authorization.authorize(params)

            return promise.should.eventually.be.fulfilled
                .then((r) => expect(r).to.eql({ action : "auth" }))
        })

        it("should return validation error if data is invalid", () => {
            const asserts = [
                { email: "", password : "" },
                { email: "test", password : "" },
                { email: "test", password : "testtest" },
                { email: "test@test.com", password : "" }
            ]

            return Promise.all(asserts.map((a: any) => {
                return authorization.authorize(a).should.be.rejected
                    .then((e: SDKError) => {
                        expect(e.code).to.equal(VALIDATION_ERROR)
                        expect(e.type).to.equal("request")
                        expect(e.status).to.equal(0)
                    })
            }))
        })

    })

})
