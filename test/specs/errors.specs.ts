import "../utils"
import { expect } from "chai"
import * as Codes from "../../src/errors/ErrorsConstants"
import { SDKError, errorFromResponse, errorFromValidation, ErrorResponseBody } from "../../src/errors/SDKError"

describe("Errors", () => {

    context("errorFromResponse", () => {
        it("should create SDKError from api error response", () => {
            const status: number = 400
            const response: ErrorResponseBody = {
                code   : "INTERNAL_SERVER_ERROR",
                errors : [],
                status : "error"
            }

            expect(errorFromResponse(status, response)).to.eql({
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
