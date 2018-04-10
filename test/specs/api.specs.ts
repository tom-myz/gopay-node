import { expect } from "chai";
import sinon, { SinonSandbox } from "sinon"
import fetchMock, { FetchMockStatic } from "fetch-mock";
import jwt from "jsonwebtoken";
import { parseUrl } from "query-string";
import { HTTPMethod, RestAPI, RestAPIOptions} from "../../src/api/RestAPI";
import { testEndpoint } from "../utils";
import { ENV_KEY_APP_ID, ENV_KEY_SECRET, IDEMPOTENCY_KEY_HEADER } from "../../src/common/constants";
import { ResponseErrorCode } from "../../src/errors/APIError";
import { ResponseError } from "../../src/errors/RequestResponseError";

describe("API", function () {
    const okResponse = { ok : true }

    let sandbox: SinonSandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create({
            properties: ["spy", "clock"]
        });
    });

    afterEach(function () {
        fetchMock.restore();
        sandbox.restore();
    });

    it("should create instance with proper parameters", function () {
        const jwtToken = jwt.sign({ foo : "bar" }, "foo");

        const asserts: Array<[RestAPIOptions, string, string, string, string, string]> = [
            [{ endpoint : "/" }, "/", undefined, undefined, undefined, undefined],
            [{ endpoint : "/", appId: "id" }, "/", "id", undefined, undefined, undefined],
            [{ endpoint : "/", appId: "id", secret : "secret" }, "/", "id", "secret", undefined, undefined],
            [{ endpoint : "/", authToken : "token" }, "/", undefined, undefined, "token", undefined],
            [{ endpoint : "/", jwt : jwtToken }, "/", undefined, undefined, undefined, jwtToken]
        ];

        for (const [options, endpoint, appId, secret, authToken, jwt] of asserts) {
            const api: RestAPI = new RestAPI(options);

            expect(api.endpoint).to.equal(endpoint);
            expect(api.appId).to.equal(appId);
            expect(api.secret).to.equal(secret);
            expect(api.authToken).to.equal(authToken);
            expect(api.jwtRaw).to.equal(jwt);
        }
    });

    it("should take appId and secret from environment variable", function () {
        process.env[ENV_KEY_APP_ID] = "envId";
        process.env[ENV_KEY_SECRET] = "envSecret";

        const api: RestAPI = new RestAPI({ endpoint : "/" });

        expect(api.appId).to.equal("envId")
        expect(api.secret).to.equal("envSecret");

        delete process.env[ENV_KEY_APP_ID];
        delete process.env[ENV_KEY_SECRET];
    });

    it("should send request to the api", async function () {
        fetchMock.getOnce(
            `${testEndpoint}/ok`,
            {
                status  : 200,
                body    : okResponse,
                headers : { "Content-Type" : "application/json" }
            }
        );

        const api: RestAPI = new RestAPI({ endpoint : testEndpoint });
        const response = await api.send(HTTPMethod.GET, "/ok");

        expect(response).to.eql(okResponse);
    });

    it("should return error response", async function () {
        fetchMock.getOnce(
            `${testEndpoint}/error`,
            { status : 503 }
        );

        const api: RestAPI = new RestAPI({ endpoint : testEndpoint });
        const spy = sinon.spy()
        const error = new ResponseError({
            code     : ResponseErrorCode.ServiceUnavailable,
            errors   : [],
            httpCode : 503
        });

        const resError = await expect(api.send(HTTPMethod.GET, "/error", null, spy)).to.eventually.be.rejected;

        expect(resError).to.be.instanceOf(ResponseError);
        expect(resError.errorResponse).to.eql(error.errorResponse);
        expect(spy).calledOnce.calledWith(resError);
    });

    it("should send request with authorization header", async function () {
        const jwtTokenPayload = { foo : "bar" };
        const jwtToken = jwt.sign(jwtTokenPayload, "foo");
        const jwtToken1 = jwt.sign(jwtTokenPayload, "foo1");

        const asserts: Array<[object, object, string]> = [
            [{}, null, null],
            [{ appId : "id" }, null, "ApplicationToken id|"],
            [{ appId : "id", secret : "secret" }, null, "ApplicationToken id|secret"],
            [{ appId : "id", secret : "secret" }, { appId : "id1" }, "ApplicationToken id1|secret"],
            [{ appId : "id", secret : "secret" }, { secret : "secret1" }, "ApplicationToken id|secret1"],
            [null, { appId : "id" }, "ApplicationToken id|"],
            [null, { appId : "id", secret : "secret" }, "ApplicationToken id|secret"],
            [{ authToken : "token" }, null, "Token token"],
            [{ authToken : "token" }, { authToken : "token1" }, "Token token1"],
            [null, { authToken : "token1" }, "Token token1"],
            [{ jwt : jwtToken }, null, `Bearer ${jwtToken}`],
            [{ jwt : jwtToken }, { jwt : jwtToken1 }, `Bearer ${jwtToken1}`],
            [null, { jwt : jwtToken1 }, `Bearer ${jwtToken1}`],
        ];

        const mock: FetchMockStatic = fetchMock.get(
            `${testEndpoint}/header`,
            {
                status  : 200,
                body    : okResponse,
                headers : { "Content-Type" : "application/json" }
            }, {
                method : HTTPMethod.GET,
                repeat : asserts.length
            }
        );

        for (const [initParams, sendParams, authHeader] of asserts) {
            const api: RestAPI = new RestAPI({ endpoint : testEndpoint, ...initParams })
            const response = await api.send(HTTPMethod.GET, "/header", sendParams);
            const { headers }  = mock.lastCall()[1];
            const reqAuthHeader = (headers as Headers).get("Authorization");

            expect(reqAuthHeader).to.be.equal(authHeader ? authHeader : null);
            expect(response).to.eql(okResponse);
        }
    });

    it("should update token if it comes back in the response", async function () {
        const jwtTokenPayload = { foo : "bar" };
        const jwtToken = jwt.sign(jwtTokenPayload, "foo");

        fetchMock.getOnce(
            `${testEndpoint}/header`,
            {
                status  : 200,
                body    : okResponse,
                headers : {
                    "Content-Type"  : "application/json",
                    "Authorization" : `Bearer ${jwtToken}`
                }
            }
        );

        const api: RestAPI = new RestAPI({ endpoint : testEndpoint });

        expect(api.jwtRaw).to.be.undefined;
        expect(api.jwt).to.be.null;

        await api.send(HTTPMethod.GET, "/header");

        expect(api.jwtRaw).to.equal(jwtToken);
        expect(api.jwt).to.contain(jwtTokenPayload);
    });

    it("should fire callback with new token if it was updated", async function () {
        const jwtToken = jwt.sign({ foo : "bar" }, "foo");

        fetchMock.getOnce(
            `${testEndpoint}/header`,
            {
                status  : 200,
                body    : okResponse,
                headers : {
                    "Content-Type"  : "application/json",
                    "Authorization" : `Bearer ${jwtToken}`
                }
            }
        );

        const handleToken = sandbox.spy();
        const api: RestAPI = new RestAPI({ endpoint : testEndpoint, handleUpdateJWT : handleToken });

        await api.send(HTTPMethod.GET, "/header");

        expect(handleToken).to.have.been.calledOnce.calledWith(jwtToken);
    });

    it("should send request with idempotent key", async function () {
        const mock: FetchMockStatic = fetchMock.getOnce(
            `${testEndpoint}/header`,
            {
                status  : 200,
                body    : okResponse,
                headers : { "Content-Type" : "application/json" }
            }
        );

        const api: RestAPI = new RestAPI({ endpoint : testEndpoint });
        await api.send(HTTPMethod.GET, "/header", { idempotentKey : "test" });

        const { headers } = mock.lastCall()[1];
        const keyHeader = (headers as Headers).get(IDEMPOTENCY_KEY_HEADER);

        expect(keyHeader).to.equal("test");
    });

    it("should convert all params to underscore", async function () {
        const mock: FetchMockStatic = fetchMock.mock(
            `begin:${testEndpoint}/camel`,
            {
                status  : 200,
                headers : { "Content-Type" : "application/json" }
            }
        );

        const expectationPost = { foo: "bar", fizz_buzz: true };
        const expectationGet = { foo: "bar", fizz_buzz: "true" };

        const asserts = [
            { foo: "bar", fizz_buzz: true },
            { foo: "bar", fizzBuzz: true }
        ];

        const api: RestAPI = new RestAPI({ endpoint : testEndpoint });

        // For request with payload
        for (const assert of asserts) {
            await api.send(HTTPMethod.POST, "/camel", assert);
            const [ url, init ]  = mock.lastCall();
            const req = new Request(url, init);
            await expect(req.json()).to.eventually.eql(expectationPost);
        }

        // For request without payload
        for (const assert of asserts) {
            await api.send(HTTPMethod.GET, "/camel", assert);
            const [ url ]  = mock.lastCall();
            const { query } = parseUrl(url);
            expect(query).to.eql(expectationGet);
        }
    });

    it("should return response with camel case properties names", async function () {
        fetchMock.getOnce(
            `${testEndpoint}/camel`,
            {
                status  : 200,
                body    : { foo_bar : true },
                headers : { "Content-Type" : "application/json" }
            }
        );

        const api: RestAPI = new RestAPI({ endpoint : testEndpoint });
        const response = await api.send(HTTPMethod.GET, "/camel");

        expect(response).to.eql({ fooBar : true });
    })

    it("should ping the api", async function () {
        fetchMock.getOnce(
            `${testEndpoint}/heartbeat`,
            {
                status  : 200
            }
        );

        const api: RestAPI = new RestAPI({ endpoint : testEndpoint });
        await expect(api.ping()).to.eventually.be.undefined;
    })

});
