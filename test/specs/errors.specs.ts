import "../utils"
import { test, TestContext } from "ava"
import { ErrorResponse } from "../../src/api/RestAPI"
import { APIError, ResponseErrorCode } from "../../src/errors/APIError"
import { fromError } from "../../src/errors/parser"

test("fromError # should create ErrorResponse from api error response", (t: TestContext) => {
    const status: number = 500
    const response: ErrorResponse = {
        code   : ResponseErrorCode.InternalServerError,
        errors : [],
        status : "error"
    }
    const error: APIError = new APIError(status, response)

    t.deepEqual(fromError(error), {
        code     : ResponseErrorCode.InternalServerError,
        errors   : [],
        httpCode : 500,
        status   : "error"
    })
})
