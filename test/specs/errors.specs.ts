import "../utils"
import { expect } from "chai"
import superagent = require("superagent")
import * as Codes from "../../src/errors/ErrorsConstants"
import { SDKError, errorFromResponse, errorFromValidation } from "../../src/errors/SDKError"

describe("Errors", () => {

    context("errorFromResponse", () => {
        it("should create SDKError from api error response", () => {
            const response: superagent.Response = {
                body : {
                    code   : "INTERNAL_SERVER_ERROR",
                    errors : [],
                    status : "error"
                },
                status : 400
            } as superagent.Response

            expect(errorFromResponse(response)).to.eql({
                code   : "INTERNAL_SERVER_ERROR",
                errors : [],
                status : 400,
                type   : "response"
            })
        })
    })

    context("errorFromValidation", () => {
        it("should create SDKError from validation errors", () => {
            const validationErrors = {
                foo: ["REQUIRED_VALUE"],
                bar: ["INVALID_FORMAT"]
            }

            expect(errorFromValidation(validationErrors)).to.eql({
                code   : "VALIDATION_ERROR",
                errors : [
                    { field : "foo", reason : "REQUIRED_VALUE" },
                    { field : "bar", reason : "INVALID_FORMAT" }
                ],
                status : 0,
                type   : "request"
            })
        })
    })

})
