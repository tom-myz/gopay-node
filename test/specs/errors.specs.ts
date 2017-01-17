import "../utils"
import { expect } from "chai"
import * as Codes from "../../src/errors/ErrorsConstants"
import { ErrorResponse } from "../../src/api/RestAPI"
import { APIError } from "../../src/errors/APIError"
import { fromError } from "../../src/errors/parser"

describe("Errors", () => {

    context("fromError", () => {
        it("should create ErrorResponse from api error response", () => {
            const status: number = 400
            const response: ErrorResponse = {
                code   : "INTERNAL_SERVER_ERROR",
                errors : [],
                status : "error"
            }
            const error: APIError = new APIError(status, response)

            expect(fromError(error)).to.eql({
                code     : "INTERNAL_SERVER_ERROR",
                errors   : [],
                httpCode : 400,
                status   : "error"
            })
        })
    })

})
