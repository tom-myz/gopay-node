/**
 *  @internal
 *  @module Utils
 */

import jwtDecode from "jwt-decode";
import camelCase from "camelcase";
import { JWTError } from "../../errors/JWTError";
import { transformKeys } from "../../utils/object";

export interface JWTBasePayload {
    iss?: string;
    sub?: string;
    aud?: string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
}

export type JWTPayload<Payload> = JWTBasePayload & Payload;

export function parseJWT<Payload>(jwt: string, keepKeys: boolean = false): JWTPayload<Payload> | null {
    if (!jwt) {
        return null;
    }

    if (jwt.split(".").length !== 3) {
        throw new JWTError();
    }

    try {
        const decoded = jwtDecode(jwt);
        return keepKeys ? decoded : transformKeys(decoded, camelCase) ;
    } catch {
        throw new JWTError();
    }
}

const BearerRegexp = /^Bearer (.*)$/i;

/**
 *  @internal
 */
export function extractJWT(response: Response): string | null {
    const header = response.headers.get("Authorization");
    const headerAmzn = response.headers.get("x-amzn-Remapped-Authorization");

    if (header === null && headerAmzn === null) {
        return null;
    }

    const matches = header ? header.match(BearerRegexp) : headerAmzn.match(BearerRegexp);

    return matches === null ? null : matches[1];
}
