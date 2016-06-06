import "../utils"
import { expect } from "chai"
import { RequestError } from "../../src/errors/RequestError"
import { SDK_WRONG_CREDENTIALS } from "../../src/errors/ErrorsConstants"

describe("Errors", () => {
    it("should return localised message for error", () => {
        const error = new RequestError(SDK_WRONG_CREDENTIALS)
        expect(error.getLocalised()).to.have.property("message", "Incorrect credentials data is present for the request")
    })
})
