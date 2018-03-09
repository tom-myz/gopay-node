/**
 *  @module SDK/API
 */

import "isomorphic-fetch";
import "isomorphic-form-data";
import process = require("process");
import decamelize = require("decamelize");
import {
    DEFAULT_ENDPOINT,
    ENV_KEY_ENDPOINT,
    ENV_KEY_APP_ID,
    ENV_KEY_SECRET,
    POLLING_TIMEOUT,
    IDEMPOTENCY_KEY_HEADER
} from "../constants";
import { transformKeys } from "../utils/object";
import { checkStatus, parseJSON } from "../utils/fetch";
import { TimeoutError } from "../errors/TimeoutError";
import { fromError } from "../errors/parser";
import { stringify as stringifyQuery } from "query-string";
import { ResponseErrorCode, RequestErrorCode } from "../errors/APIError";
import {extractJWT, JWTPayload, parseJWT} from "./utils/JWT";
import { get, omit } from "lodash";
import pTimeout = require("p-timeout");
import pDoWhilst = require("p-do-whilst");

export enum HTTPMethod {
    GET    = "GET",
    POST   = "POST",
    PATCH  = "PATCH",
    UPDATE = "PATCH",
    DELETE = "DELETE",
    OPTION = "OPTION",
    HEAD   = "HEAD"
}

export interface RestAPIOptions {
    endpoint?: string;
    jwt?: string;
    handleUpdateJWT?(jwt: string): void;

    // Deprecated
    authToken?: string;
    appId?: string;
    secret?: string;
}

export interface SubError {
    reason: RequestErrorCode | ResponseErrorCode
}

export interface ValidationError extends SubError {
    field: string
}

export interface ErrorResponse {
    httpCode?: number
    status: string
    code: ResponseErrorCode | RequestErrorCode
    errors: Array<SubError | ValidationError>
}

export type ResponseCallback<A> = (response: A | Error) => void

export type PromiseResolve<A> = (value?: A | PromiseLike<A>) => void
export type PromiseReject = (reason?: any) => void

export interface AuthParams {
    jwt?: string;

    // Deprecated
    authToken?: string;
    appId?: string;
    secret?: string;
}

export interface PollParams {
    poll: boolean;
}

export interface IdempotentParams {
    idempotentKey?: string;
}

const internalParams: Array<keyof AuthParams | keyof IdempotentParams> = ["appId", "secret", "authToken", "jwt", "idempotentKey"];

export type PromiseCreator<A> = () => Promise<A>

export type SendData<Data> = Data & AuthParams & IdempotentParams;

function getData<Data extends object>(data: SendData<Data>): Data {
    // TODO: make extraction from FormData
    return data instanceof FormData
        ? {} as any
        : omit(data, internalParams);
}

function getRequestBody<Data>(data: SendData<Data>): string | FormData {
    return data instanceof FormData
        ? data
        : JSON.stringify(transformKeys(omit(data, internalParams), decamelize));
}

function getIdempotencyKey<Data>(data: SendData<Data>): string | null {
    // TODO: make extraction from FormData
    return data instanceof FormData
        ? null
        : get(data, "idempotentKey");
}

function stringifyParams<Data extends object>(data: Data): string {
    const query = stringifyQuery(transformKeys(data, decamelize), { arrayFormat : "bracket" });
    return query ? `?${query}` : "";
}

async function execRequest<A>(executor: () => Promise<A>, callback?: ResponseCallback<A>): Promise<A> {
    try {
        const response = await executor();
        if (typeof callback === "function") {
            callback(response);
        }
        return response;
    } catch (error) {
        const err: Error = error instanceof TimeoutError
            ? error
            : fromError(error);
        if (typeof callback === "function") {
            callback(err);
        }
        throw err;
    }
}

export class RestAPI {

    endpoint: string;
    jwt: JWTPayload<any>;
    protected handleUpdateJWT: (jwt: string) => void = () => undefined;

    /**
     *  @deprecated
     */
    appId: string;

    /**
     *  @deprecated
     */
    secret: string;

    /**
     *  @deprecated
     */
    authToken: string;

    private _jwtRaw: string = null;

    constructor(options: RestAPIOptions = {}) {
        this.endpoint = options.endpoint || process.env[ENV_KEY_ENDPOINT] || DEFAULT_ENDPOINT;
        this.jwtRaw = options.jwt;

        if (options.handleUpdateJWT && typeof options.handleUpdateJWT === "function") {
            this.handleUpdateJWT = options.handleUpdateJWT;
        }

        this.appId = options.appId || process.env[ENV_KEY_APP_ID];
        this.secret = options.secret || process.env[ENV_KEY_SECRET];
        this.authToken = options.authToken;
    }

    set jwtRaw(jwtRaw: string) {
        this.jwt = parseJWT(jwtRaw);
        this._jwtRaw = jwtRaw;
    }

    get jwtRaw(): string | null {
        return this._jwtRaw;
    }

    /**
     * @internal
     */
    async send<A, Data = any>(method: HTTPMethod,
                              uri: string,
                              data?: SendData<Data>,
                              callback?: ResponseCallback<A>): Promise<A> {

        const payload: boolean = [HTTPMethod.GET, HTTPMethod.DELETE].indexOf(method) === -1;

        const params: RequestInit = {
            headers : this.getHeaders(data),
            method
        };

        const requestData = getData(data);

        /*
        const request: Request = new Request(
            `${this.endpoint}${uri}${payload ? "" : stringifyParams(requestData)}`,
            payload ? { ...params, body : getRequestBody(data) } : params
        );
        */

        return await execRequest(async () => {
            // FIXME: Use Request when fetch-mock is fixed
            // const response = await fetch(request);
            const response = await fetch(
                `${this.endpoint}${uri}${payload ? "" : stringifyParams(requestData)}`,
                payload ? { ...params, body : getRequestBody(data) } : params
            );

            await checkStatus(response);

            const jwt = await extractJWT(response);

            if (!!jwt) {
                this.jwtRaw = jwt;
                this.handleUpdateJWT(jwt);
            }

            return await parseJSON(response);
        }, callback);
    }

    protected getHeaders<Data extends object>(data: SendData<Data>): Headers {
        const headers: Headers = new Headers();
        const isFormData = data instanceof FormData;

        headers.append("Accept", "application/json");

        if (!isFormData) {
            headers.append("Content-Type", "application/json");
        } else {
            headers.append("Content-Type", "multipart/form-data");
        }

        const idempotentKey = getIdempotencyKey(data);

        if (idempotentKey) {
            headers.append(IDEMPOTENCY_KEY_HEADER, idempotentKey);
        }

        // Deprecated
        const {
            authToken = this.authToken,
            appId = this.appId,
            secret = this.secret,
            jwt = this._jwtRaw
        } = { ...(!isFormData ? data : {}) };

        if (authToken) {
            headers.append("Authorization", `Token ${authToken}`);
        } else if (appId) {
            headers.append("Authorization", `ApplicationToken ${appId}|${secret || ""}`);
        } else if (jwt) {
            headers.append("Authorization", `Bearer ${jwt}`);
        }

        return headers;
    }

    /**
     * @internal
     */
    async longPolling<A>(promise: PromiseCreator<A>,
                         condition: (response: A) => boolean,
                         callback?: ResponseCallback<A>,
                         timeout: number = POLLING_TIMEOUT): Promise<A> {

        return await execRequest(async () => {
            let response: A;
            let timedOut: boolean = false;

            await pTimeout(
                pDoWhilst(async () => {
                    response = await promise();
                }, () => !condition(response) && !timedOut),
                timeout,
                () => {
                    timedOut = true;
                    throw new TimeoutError(timeout);
                }
            );
            return response;
        }, callback);
    }

}
