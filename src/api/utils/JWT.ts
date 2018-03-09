/**
 *  @internal
 *  @module Utils
 */

import jwtDecode = require("jwt-decode");
import { JWTError } from "../../errors/JWTError";

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

export function parseJWT<Payload>(jwt: string): JWTPayload<Payload> | null {
    if (!jwt) {
        return null;
    }

    if (jwt.split(".").length !== 3) {
        throw new JWTError();
    }

    try {
        return jwtDecode(jwt);
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

    if (header === null) {
        return null;
    }

    const matches = header.match(BearerRegexp);
    return matches === null ? null : matches[1];
}
