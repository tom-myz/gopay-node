"use strict";
require("../utils");
var nock = require("nock");
var RestAPI_1 = require("../../src/api/RestAPI");
var TransactionsHistory_1 = require("../../src/resources/TransactionsHistory");
describe("Transaction History", function () {
    var api;
    var history;
    var scope;
    var testEndpoint = "http://localhost:80";
    beforeEach(function () {
        api = new RestAPI_1.RestAPI({ endpoint: testEndpoint });
        history = new TransactionsHistory_1.TransactionsHistory(api);
        scope = nock(testEndpoint);
    });
    afterEach(function () {
        nock.cleanAll();
    });
    context("route GET /transaction_history", function () {
        it("should return correct response", function () {
            var okResponse = { action: "list" };
            var okScope = scope
                .get("/transaction_history")
                .once()
                .reply(200, okResponse, { "Content-Type": "application/json" });
            return history.list().should.eventually.eql(okResponse);
        });
    });
    context("route GET /stores/:storeId/transaction_history", function () {
        it("should return correct response", function () {
            var okResponse = { action: "list" };
            var okScope = scope
                .get(/\/stores\/[a-f0-9\-]+\/transaction_history$/i)
                .once()
                .reply(200, okResponse, { "Content-Type": "application/json" });
            return history.list(null, null, "1").should.eventually.eql(okResponse);
        });
    });
});
