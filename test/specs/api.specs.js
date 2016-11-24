"use strict";
require("../utils");
var chai_1 = require("chai");
var sinon = require("sinon");
var nock = require("nock");
var constants_1 = require("../../src/constants");
var RestAPI_1 = require("../../src/api/RestAPI");
var ErrorsConstants_1 = require("../../src/errors/ErrorsConstants");
describe("RestAPI", function () {
    var mockOk;
    var mockError;
    var testEndpoint = "http://localhost:80";
    var scope;
    var sandbox;
    before(function () {
        var REPEATS = 100;
        scope = nock(testEndpoint);
        mockOk = scope
            .get("/ok")
            .times(REPEATS)
            .reply(200, { ok: true }, { "Content-Type": "application/json" });
        mockError = scope
            .get("/error")
            .times(REPEATS)
            .reply(400, {}, { "Content-Type": "application/json" });
        sandbox = sinon.sandbox.create({
            properties: ["spy", "clock"]
        });
    });
    after(function () {
        sandbox.restore();
        nock.cleanAll();
    });
    it("should create instance with proper parameters", function () {
        var asserts = [
            [{ endpoint: "/" }, "/", undefined, undefined],
            [{ endpoint: "/", appId: "id" }, "/", "id", undefined],
            [{ endpoint: "/", appId: "id", secret: "secret" }, "/", "id", "secret"],
            [{ endpoint: "/" }, "/", undefined, undefined]
        ];
        asserts.forEach(function (a) {
            var api = new RestAPI_1.RestAPI(a[0]);
            chai_1.expect(api.endpoint).to.equal(a[1]);
            chai_1.expect(api.appId).to.equal(a[2]);
            chai_1.expect(api.secret).to.equal(a[3]);
        });
    });
    it("should take appId and secret from environment variable", function () {
        process.env[constants_1.ENV_KEY_APP_ID] = "envId";
        process.env[constants_1.ENV_KEY_SECRET] = "envSecret";
        var api = new RestAPI_1.RestAPI({ endpoint: "/" });
        chai_1.expect(api.appId).to.equal("envId");
        chai_1.expect(api.secret).to.equal("envSecret");
        delete process.env[constants_1.ENV_KEY_APP_ID];
        delete process.env[constants_1.ENV_KEY_SECRET];
    });
    it("should send request to the api", function () {
        this.timeout(200);
        var api = new RestAPI_1.RestAPI({ endpoint: testEndpoint });
        return api.send("GET", "/ok").should.eventually.be.fulfilled
            .then(function (r) { return chai_1.expect(r).to.eql({ ok: true }); });
    });
    it("should send request with authorization header", function () {
        this.timeout(200);
        var asserts = [
            [{}, null, null],
            [{ appId: "id" }, null, "ApplicationToken id|"],
            [{ appId: "id", secret: "secret" }, null, "ApplicationToken id|secret"],
            [{ appId: "id", secret: "secret" }, { appId: "id1" }, "ApplicationToken id1|secret"],
            [{ appId: "id", secret: "secret" }, { secret: "secret1" }, "ApplicationToken id|secret1"],
        ];
        var mock;
        var spy = sandbox.spy(global, "fetch");
        return Promise.all(asserts.map(function (a, i) {
            var api = new RestAPI_1.RestAPI(Object.assign({}, { endpoint: testEndpoint }, a[0]));
            mock = scope
                .get("/header")
                .once()
                .reply(200, { ok: true }, Object.assign({ "Content-Type": "application/json" }, a[2] ? { "Authorization": a[2] } : null));
            return api.send("GET", "/header", a[1]).should.eventually.be.fulfilled
                .then(function (r) {
                if (!a[2]) {
                    chai_1.expect(spy.getCall(i).args[0].headers.has("Authorization")).to.be.false;
                }
                else {
                    chai_1.expect(spy.getCall(i).args[0].headers.get("Authorization")).to.equal(a[2]);
                }
                chai_1.expect(r).to.eql({ ok: true });
            });
        })).then(function () { return global.fetch.restore(); });
    });
    it("should use callback to return result", function () {
        this.timeout(200);
        var api = new RestAPI_1.RestAPI({ endpoint: testEndpoint });
        var spy = sinon.spy();
        return api.send("GET", "/ok", null, spy).should.eventually.be.fulfilled
            .then(function () { return chai_1.expect(spy).to.have.been.calledOnce.and.calledWith({ ok: true }); });
    });
    it("should return error response", function () {
        this.timeout(200);
        var api = new RestAPI_1.RestAPI({ endpoint: testEndpoint });
        var spy = sinon.spy();
        var error = { code: ErrorsConstants_1.BAD_REQUEST, errors: [], status: "error", httpCode: 400 };
        return api.send("GET", "/error", null, spy).should.eventually.be.rejected
            .then(function (e) {
            chai_1.expect(e).to.eql(error);
            chai_1.expect(spy).to.have.been.calledOnce.and.calledWith(error);
        });
    });
    it("should convert all params to underscore", function () {
        var expectation = { foo: "bar", "fizz_buzz": true };
        var asserts = [
            { foo: "bar", "fizz_buzz": true },
            { foo: "bar", fizzBuzz: true }
        ];
        asserts.forEach(function (a) {
            chai_1.expect(RestAPI_1.RestAPI.requestParams(a)).to.eql(expectation);
        });
    });
    it("should return response with camel case properties names", function () {
        this.timeout(200);
        var api = new RestAPI_1.RestAPI({ endpoint: testEndpoint });
        nock(testEndpoint)
            .get("/camel")
            .once()
            .reply(200, { "foo_bar": true }, { "Content-Type": "application/json" });
        return api.send("GET", "/camel").should.eventually.be.fulfilled
            .then(function (r) { return chai_1.expect(r).to.eql({ fooBar: true }); });
    });
    it("should do long polling until condition is met", function () {
        var api = new RestAPI_1.RestAPI({ endpoint: testEndpoint });
        var repeats = 3;
        var promise = function () { return new Promise(function (resolve) { return resolve(--repeats === 0); }); };
        var spy = sandbox.spy(promise);
        var result = api.longPolling(spy, function (result) { return result === true; }, null, 10);
        return chai_1.expect(result).to.eventually.be.true
            .then(function () { return chai_1.expect(spy).to.have.been.calledThrice; });
    });
});
