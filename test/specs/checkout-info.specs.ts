import { expect } from "chai";
import fetchMock from "fetch-mock";
import { testEndpoint } from "../utils";
import {
    CheckoutInfo,
    CheckoutInfoParams
} from "../../src/resources/CheckoutInfo";
import { RestAPI } from "../../src/api/RestAPI";
import { generateFixture as generateCheckoutInfo } from "../fixtures/checkout-info";
import { RequestError } from "../../src/errors/RequestResponseError";
import {createRequestError} from "../fixtures/errors";

describe("Checkout Info", function () {

    let api: RestAPI;
    let checkoutInfo: CheckoutInfo;

    const recordData = generateCheckoutInfo();

    beforeEach(function () {
        api = new RestAPI({ endpoint: testEndpoint });
        checkoutInfo = new CheckoutInfo(api);
    });

    afterEach(function () {
        fetchMock.restore();
    });

    context("GET /checkout_info", function () {
        it("should get response", async function () {
            fetchMock.getOnce(
                `begin:${testEndpoint}/checkout_info`,
                {
                    status  : 200,
                    body    : recordData,
                    headers : { "Content-Type" : "application/json" }
                }
            );

            const origin = "http://fake.com";

            await expect(checkoutInfo.get({ origin })).to.eventually.eql(recordData);
        });

        it("should return validation error if data is invalid", async function () {
            const asserts: Array<[Partial<CheckoutInfoParams>, RequestError]> = [
                [{}, createRequestError(["origin"])]
            ];

            for (const [data, error] of asserts) {
                await expect(checkoutInfo.get(data as CheckoutInfoParams)).to.eventually.be.rejectedWith(RequestError)
                    .that.has.property("errorResponse")
                    .which.eql(error.errorResponse);
            }
        });
    });

});
