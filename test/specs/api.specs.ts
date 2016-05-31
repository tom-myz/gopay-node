import "../utils"
import { expect } from "chai"
import * as sinon from "sinon"
import SinonSandbox = Sinon.SinonSandbox;
import { APIBridge } from "../../src/api/API"

context("API Bridge", () => {
    
    let sandbox: SinonSandbox
    let API: APIBridge

    beforeEach(() => {
        sandbox = sinon.sandbox.create()
        API = new APIBridge()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe("isTest", () => {
        it("should not be in test mode by default", () => {
            expect(API.isTest()).to.be.false
        })

        it("should properly change test mode", () => {
            API.setTest(true)
            expect(API.isTest()).to.be.true
            API.setTest(false)
            expect(API.isTest()).to.be.false
        })

        it("should override return value by provided parameter", () => {
            expect(API.isTest(true)).to.be.true
            API.setTest(true)
            expect(API.isTest(false)).to.be.false
            API.setTest(false)
            expect(API.isTest(true)).to.be.true
        })
    })

    describe("setToken", () => {
        it("should properly set auth token", () => {
            expect((<any>API)._auth.token).to.be.null
            API.setToken({ token : "token" })
            expect((<any>API)._auth.token).to.be.equal("token")
        })
    })

    describe("send", () => {
        it("should send request to the server with auth header")

        it("should override default options with provided ones")

        it("should override auth header with the provided one")

        it("should return error on error response")
    })

    describe("authenticate", () => {

        it("should send request to the server with credentials")

        it("should call setToken on successful response")

    })


})
