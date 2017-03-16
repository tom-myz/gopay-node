import "../utils"
import { test, TestContext } from "ava"
import * as Codes from "../../src/errors/ErrorsConstants"
import { ErrorResponse } from "../../src/api/RestAPI"
import { APIError } from "../../src/errors/APIError"
import { fromError } from "../../src/errors/parser"

test("fromError # should create ErrorResponse from api error response", (t: TestContext) => {
    const status: number = 400
    const response: ErrorResponse = {
        code   : "INTERNAL_SERVER_ERROR",
        errors : [],
        status : "error"
    }
    const error: APIError = new APIError(status, response)

    t.deepEqual(fromError(error), {
        code     : "INTERNAL_SERVER_ERROR",
        errors   : [],
        httpCode : 400,
        status   : "error"
    })
})
