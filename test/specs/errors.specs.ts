import "../utils"
import { expect } from "chai"
import { RequestError } from "../../src/errors/RequestError"
import { ResponseError } from "../../src/errors/ResponseError"
import * as Errors from "../../src/errors/ErrorsConstants"
import Response from "~popsicle/dist/response"

describe("Errors", () => {
    it("should return localised message for error", () => {
        const error = new RequestError(Errors.SDK_WRONG_CREDENTIALS)
        expect(error.getLocalised()).to.have.property("message", "Incorrect credentials data is present for the request")
    })

    it("should correctly create response error", () => {
        const asserts: Array<any> = [
            [400, { status : "error", key : "BAD_REQUEST", errors : [] }, "BAD_REQUEST", []],
            [400, null, Errors.BAD_REQUEST, []],
            [401, { status : "error", key : "INVALID_CREDENTIALS", errors : [] }, "INVALID_CREDENTIALS", []],
            [401, null, Errors.NOT_AUTHORIZED, []],
            [403, null, Errors.FORBIDDEN, []],
            [404, { status : "error", key : "STORE_NOT_FOUND", errors : [] }, "STORE_NOT_FOUND", []],
            [404, null, Errors.NOT_FOUND, []],
            [409, { status : "error", key : "STORE_EXISTS", errors : [] }, "STORE_EXISTS", []],
            [409, null, Errors.CONFLICTED, []],
            [500, { status : "error", key : "DB_ERROR", errors : [] }, "DB_ERROR", []],
            [500, null, Errors.INTERNAL_ERROR, []],
            [503, null, Errors.UNKNOWN, []],
        ]

        asserts.forEach((a) => {
            const response: Response = <Response>{
                status : a[0],
                body : a[1]
            }
            const error = new ResponseError(response)
            expect(error.code).to.equal(a[2])
            expect(error.errors).to.be.empty
        })
    })

    it("should create validation error from response error of certain type", () => {
        const errorResponse: Response = <Response>{
            status : 400,
            body : {
                status : "error",
                key : "BAD_REQUEST",
                errors : [
                    { field : "foo", reason : "REQUIRED_VALUE" },
                    { field : "bar", reason : "INVALID_FORMAT" }
                ]
            }
        }
        const error = new ResponseError(errorResponse)

        expect(error.code).to.equal(Errors.VALIDATION_ERROR)
        expect(error.errors).to.eql([{ foo : "REQUIRED_VALUE" }, { bar : "INVALID_FORMAT" }])
    })
})
