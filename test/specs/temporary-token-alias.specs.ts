import { expect } from "chai";
import fetchMock from "fetch-mock";
import { testEndpoint } from "../utils";
import { pathToRegexMatcher } from "../utils/routes";
import { RestAPI} from "../../src/api/RestAPI";
import { generateFixture as generateTemporaryTokenAlias } from "../fixtures/temporary-token-alias";
import { TemporaryTokenAliasItem, TemporaryTokenAlias, TemporaryTokenAliasCreateParams } from "../../src/resources/TemporaryTokenAlias";

describe("Temporary Token Alias", function () {

    let api: RestAPI;
    let temporaryTokenAlias: TemporaryTokenAlias;

    const recordBasePathMatcher = `${testEndpoint}/tokens/alias`;
    const recordPathMatcher = pathToRegexMatcher(`${testEndpoint}/stores/:storeId/tokens/alias/:id`);
    const recordData: TemporaryTokenAliasItem = generateTemporaryTokenAlias();

    beforeEach(function () {
        api = new RestAPI({ endpoint: testEndpoint });
        temporaryTokenAlias = new TemporaryTokenAlias(api);
    });

    afterEach(function () {
        fetchMock.restore();
    });

    context("POST /tokens/alias", function () {
        it("should get response", async function () {
            fetchMock.postOnce(
                recordBasePathMatcher,
                {
                    status: 201,
                    body: recordData,
                    headers : { "Content-Type" : "application/json" }
                }
            );
            const data: TemporaryTokenAliasCreateParams = {
                transactionTokenId: recordData.transactionTokenId,
                validUntil: recordData.validUntil
            };
            await expect(temporaryTokenAlias.create(data)).to.eventually.eql(recordData);
        });
    });

    context("GET /stores/:storeId/tokens/alias/:id", function () {
        it("should get response", async function () {
            fetchMock.getOnce(
                recordPathMatcher,
                {
                    status: 200,
                    body: recordData,
                    headers: { "Content-Type" : "application/json" }
                }
            );
            await expect(temporaryTokenAlias.get(recordData.storeId, recordData.id)).to.eventually.be.eql(recordData);
        });
    });

    context("DELETE /stores/:storeId/tokens/alias/:id", function () {
        it("should get response", async function () {
            fetchMock.deleteOnce(
                recordPathMatcher,
                {
                    status  : 204,
                    headers : { "Content-Type" : "application/json" }
                }
            );
            await expect(temporaryTokenAlias.delete(recordData.storeId, recordData.id)).to.eventually.be.empty;
        });
    });
});
